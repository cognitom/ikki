/*!
 * ikki (http://cognitom.github.io/ikki/)
 * Copyright 2015 Tsutomu Kawamura.
 * Licensed under MIT
 */
;(function(window) {

var riot = (!window || !window.riot) ? require('riot') : window.riot;

riot.tag('route', ' <section if="{ show }"><yield ></yield></section>', function(opts) {
    var self = this
    self.show = false

    function match(route, actual) {
      route = route.replace(/^\//, '')
      if ('*' == route) return {}
      var vs = []
      var re = route.replace(/(^|\/):([^\/]+)/g, function(_, b, p) {
        vs.push(p)
        return b + '([^/]+)'
      })
      var ms = actual.match(new RegExp('^' + re + '$'))
      if (!ms) return null

      var param = {}
      vs.map(function(v, i) { param[v] = ms[i+1] })
      return param
    }

    self.on('update', function() {
      var path = self.parent.path
      var query = self.parent.query
      var param
      self.show = !self.parent.found &&
                  (param = match(opts.path, path)) !== null
      param = param || {}

      if (!self.show) return

      if (opts.redirect) {

        if (/^http/.test(opts.redirect)) location.href = opts.redirect
        else location.hash = opts.redirect
      } else {

        self.trigger('urlchanged', { path: path, query: query, param: param})
        self.parent.found = true
      }
    })

    self._ownPropKeys = []
    self._ownOptsKeys = []
    for (var k in self) self._ownPropKeys[k] = true
    for (var k in self.opts) self._ownOptsKeys[k] = true

    self.on('update', function() {
      var granpa = this.parent.parent
      if (granpa) {
        for (var k in granpa)
          if (!this._ownPropKeys[k]) this[k] = granpa[k]
        for (var k in granpa.opts)
          if (!this._ownOptsKeys[k]) this.opts[k] = granpa.opts[k]
      }
    })
  
});

riot.tag('router', ' <yield ></yield>', function(opts) {
    var self = this
    var win = window
    var evt = 'hashchange'
    self.path = ''
    self.query = {}
    self.found = false

    this.emit = function(e) {
      var raw = location.href.split('#')[1] || ''
      var path = raw.split('?')[0].replace(/^\/|\/$/g, '')
      var query = {}
      raw.replace(/[?&](.+?)=([^&]*)/g, function(_, k, v) { query[k] = v })

      self.path = path
      self.query = query
      self.found = false

      if (e) self.update()
    }.bind(this);

    self.on('mount', function() {
      win.addEventListener
        ? win.addEventListener(evt, self.emit, false)
        : win.attachEvent('on' + evt, self.emit)
    })

    self.on('unmount', function() {
      win.removeEventListener
        ? win.removeEventListener(evt, self.emit, false)
        : win.detachEvent('on' + evt, self.emit)
    })

    self.emit()
  
});

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

/**
 * simple deferred implimentation
 */

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Deferred = (function () {
  function Deferred() {
    var _this = this;

    _classCallCheck(this, Deferred);

    this.promise = new Promise(function (resolve, reject) {
      _this._resolve = resolve;
      _this._reject = reject;
    });
  }

  _createClass(Deferred, [{
    key: 'resolve',
    value: function resolve(value) {
      this._resolve(value);
    }
  }, {
    key: 'reject',
    value: function reject(reason) {
      this._reject(reason);
    }
  }]);

  return Deferred;
})();

/**
 * Edo
 */

function edo(listenTo, direction) {
  return regeneratorRuntime.mark(function callee$1$0() {
    var route = arguments[0] === undefined ? {} : arguments[0];
    var deferred, g, firstOpts;
    return regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          deferred = new Deferred();
          g = direction(route.path || '', route.query || {}, route.param || {});
          firstOpts = g.next().value;

          firstOpts.listeners = [{
            key: listenTo,
            callback: function callback(arg) {
              var v = g.next(arg).value;
              if (!v) return;
              deferred.resolve(v);
              deferred = new Deferred();
            }
          }];
          context$2$0.next = 6;
          return firstOpts;

        case 6:
          if (!true) {
            context$2$0.next = 11;
            break;
          }

          context$2$0.next = 9;
          return deferred.promise;

        case 9:
          context$2$0.next = 6;
          break;

        case 11:
        case 'end':
          return context$2$0.stop();
      }
    }, callee$1$0, this);
  });
}

/**
 * Kyoto
 */

function kyoto(main, listeners) {
  var deferred;
  var listenersArr = [];
  var first = true;

  function push(opts) {
    if (first) {
      opts.listeners = listenersArr;
      first = false;
    }
    deferred.resolve(opts);
    deferred = new Deferred();
  }

  Object.keys(listeners).map(function (key) {
    listenersArr.push({ key: key, callback: listeners[key].bind(this, push) });
  });

  return regeneratorRuntime.mark(function callee$1$0() {
    var route = arguments[0] === undefined ? {} : arguments[0];
    return regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          deferred = new Deferred();
          setTimeout(function () {
            main(push, route.path || '', route.query || {}, route.param || {});
            if (first) push({});
          }, 0);

        case 2:
          context$2$0.next = 4;
          return deferred.promise;

        case 4:
          if (true) {
            context$2$0.next = 2;
            break;
          }

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, callee$1$0, this);
  });
}

/**
 * Nara
 */

var Nara = (function () {
  function Nara() {
    _classCallCheck(this, Nara);
  }

  _createClass(Nara, [{
    key: 'direction',
    value: function direction(path, query, param) {}
  }, {
    key: 'push',
    value: function push(value) {
      this.deferred.resolve(value);
      this.deferred = new Deferred();
    }
  }, {
    key: 'error',
    value: function error(reason) {
      this.deferred.reject(reason);
      this.deferred = new Deferred();
    }
  }, {
    key: 'start',
    value: function start() {
      var self = this;
      return regeneratorRuntime.mark(function callee$2$0() {
        var route = arguments[0] === undefined ? {} : arguments[0];
        return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
          while (1) switch (context$3$0.prev = context$3$0.next) {
            case 0:
              self.deferred = new Deferred();
              setTimeout(function () {
                self.direction(route.path || '', route.query || {}, route.param || {});
              }, 10);

            case 2:
              if (!true) {
                context$3$0.next = 7;
                break;
              }

              context$3$0.next = 5;
              return self.deferred.promise;

            case 5:
              context$3$0.next = 2;
              break;

            case 7:
            case 'end':
              return context$3$0.stop();
          }
        }, callee$2$0, this);
      });
    }
  }, {
    key: 'stop',
    value: function stop() {
      var opts = arguments[0] === undefined ? {} : arguments[0];

      this.push(opts);
    }
  }, {
    key: 'on',
    value: function on(key, callback) {
      var _this2 = this;

      // TODO: remoeve setTImeout
      setTimeout(function () {
        _this2.push({
          listeners: [{ key: key, callback: callback }]
        });
      }, 1000);
    }
  }]);

  return Nara;
})();

/* extend and override this method */

if (typeof exports === 'object') {
  module.exports = {
    Deferred: Deferred,
    edo: edo,
    kyoto: kyoto,
    Nara: Nara
  }
}

})(typeof window != 'undefined' ? window : undefined)