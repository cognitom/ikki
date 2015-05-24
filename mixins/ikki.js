/*!
 * ikki mixin
 */

// Replacing url query/param automatically
// - route: #member/:id
// - actual: #member/Tom
// then, replace like below
// <my-tag message="$name" /> -> <my-tag message="Tom" />
function replaceRouteVar(str, route) {
  if (!route) return str
  Object.keys(route.query).map(function(key){
    str = str.replace(new RegExp('^\\\?' + key + '$'), route.query[key])
  })
  Object.keys(route.param).map(function(key){
    str = str.replace(new RegExp('^\\\$' + key + '$'), route.param[key])
  })
  return str
}

riot.mixin('ikki', {
  $$version: 0,

  // initialize mixin
  init: function() {
    var self = this
    var rt = self.$$findAncestor('route')

    if (rt){
      // with routing
      rt.on('urlchanged', function(route){
        self.$$loadOpts(self.opts.opts, route)
        self.one('update', function(){
          Object.keys(self.opts).map(function(key) {
            if ('string' == typeof self.opts[key])
              self.opts[key] = replaceRouteVar(self.opts[key], route)
          })
        })
      })
    } else {
      //without routing
      self.$$loadOpts(self.opts.opts)
    }
  },

  $$findAncestor: function(tagName) {
    tag = this
    while (tag && tagName != tag.root.tagName.toLowerCase())
      tag = tag.parent
    return tag || null
  },

  $$loadOpts: function(opts, route) {
    if (!opts) return

    var self = this
    var version = ++self.$$version

    if ('object' == typeof opts && !opts.then) {

      // 1: object
      self.$$extendOpts(opts)

    } else if ('object' == typeof opts) {

      // 2: promise
      opts.then(function(o) { self.$$extendOpts(o) && self.update() })

    } else if (opts && 'GeneratorFunction' == opts.constructor.name) {

      // 3: generator
      function process(gen) {
        var prom = gen.next().value
        function setAndGo(o) {
          if (version < self.$$version) return
          self.$$extendOpts(o) && self.update()
          setTimeout(function(){ process(gen) }, 0)
        }
        if (!prom) return // end of chain
        if (!prom.then) setAndGo(prom)
        else prom.then(setAndGo)
      }
      process(route ? opts(route) : opts())
    } else if ('function' == typeof opts) {

      // 4. function
      self.$$extendOpts(opts(route))

    }
  },

  $$extendOpts: function(opts) {
    var self = this
    if (opts.listeners){
      opts.listeners.map(function(l) { self.on(l.key, l.callback) })
      delete opts.listeners
    }
    var keys = Object.keys(opts)
    keys.map(function(key) { self.opts[key] = opts[key] })
    return keys.length > 0
  }
})
