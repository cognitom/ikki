/*!
 * ikki mixin
 */
;(function(window, mixin) {

  var mixinName = 'ikki'

  var riot = (!window || !window.riot) ? require('riot') : window.riot
  if (typeof exports === 'object') module.exports = mixin // CommonJS
  riot.mixin(mixinName, mixin) // Register mixin to Riot.js

})(typeof window != 'undefined' ? window : undefined,

  {
    init: function() {
      console.log('ggggg')
      var self = this
      var routeInfo = null
      var opts = {}, opts_replaced = {}

      // Replacing url params automatically
      // - route: #member/:id
      // - actual: #member/Tom
      // then, replace like below
      // <my-tag message="$name" /> -> <my-tag message="Tom" />
      function replaceParams(str){
        if (!routeInfo) return str
        var query = routeInfo.query
        var param = routeInfo.param
        Object.keys(query).map(function(key){
          str = str.replace(new RegExp('^\\\?' + key + '$'), query[key])
        })
        Object.keys(param).map(function(key){
          str = str.replace(new RegExp('^\\\$' + key + '$'), param[key])
        })
        return str
      }

      function extend(obj, from) {
        Object.keys(from).map(function(key) {
          obj[key] = from[key]
        })
      }

      self.on('update', function(){
        if (self.opts.listeners && self.opts.listeners.length) {
          self.opts.listeners.map(function(l) { self.on(l.key, l.callback) })
          self.opts.listeners = []
        }
        routeInfo = self.getRouteInfo()
        Object.keys(self.opts).map(function(key) {
          if ('opts' != key) {
            if (!opts[key] || opts_replaced[key] != self.opts[key])
              opts[key] = self.opts[key]
            self.opts[key] = replaceParams(opts[key])
            opts_replaced[key] = self.opts[key]
          }
        })
      })
      var target = self.opts.opts
      if ('object' == typeof target && !target.then) {
        console.log('1')
        // 1: object
        extend(self.opts, target)
      } else if ('object' == typeof target) {
        console.log('2')
        // 2: promise
        target.then(function(o) {
          extend(self.opts, o)
          self.update()
        })
      } else if (target && 'GeneratorFunction' == target.constructor.name) {
        console.log('3')
        // 3: generator
        function process(gen) {
          var prom = gen.next().value
          if (!prom) return
          prom.then(function(o) {
            extend(self.opts, o)
            self.update()
            setTimeout(function(){
              process(gen)
            }, 0)
          })
        }
        process(target())
      }
    },
    getRouteInfo: function() {
      tag = this
      while (tag && 'route' != tag.root.tagName.toLowerCase()) tag = tag.parent
      return !tag ? null
                  : {
                      path: tag.parent.path || '',
                      query: tag.parent.query || {},
                      param: tag.param || {}
                    }
    }
  }

)
