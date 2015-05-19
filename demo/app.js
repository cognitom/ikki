(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var regeneratorRuntime = require('regenerator/runtime');riot.tag('app', '<header> <h1>ikki</h1> <p>ikki is not flux</p> </header> <section class="billboard"> <h2>deadly simple &amp; html-centric</h2> <p>The extention toolkit for <a href="https://muut.com/riotjs/">Riot.js</a></p> <img src="demo/one-way.png"> <img src="demo/routing.png"> </section> <h2>pass a promise/generator, just like an object</h2> <h3>1. object</h3> <p>At the first, see the traditional way to give the value.</p> <highlight> &lt;my-tag message="Hi!" /&gt;<br> </highlight> <p>Then, see the ikki\'s way. You can give the data as an object.<br>Great, but boring? OK, go ahead.</p> <highlight> &lt;my-tag opts=\\{ object } /&gt;<br> &lt;script&gt;<br> &nbsp;&nbsp;this.object = \\{ message: \'Hi!\' }<br> &lt;/script&gt; </highlight> <my-tag opts="{ obj }"></my-tag> <h3>2. promise</h3> <p>We can give a promise to the tag. It\'ll make really easy to do any async process.</p> <highlight> &lt;my-tag opts=\\{ promise } /&gt;<br> &lt;script&gt;<br> &nbsp;&nbsp;this.promise = new Promise(function(resolve, reject) \\{<br> &nbsp;&nbsp;&nbsp;&nbsp;setTimeout(function() \\{<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;resolve(\\{ message: \'Hello!\' })<br> &nbsp;&nbsp;&nbsp;&nbsp;}, 10000)<br> &nbsp;&nbsp;})<br> &lt;/script&gt; </highlight> <my-tag opts="{ prom }"></my-tag> <h3>3. generator</h3> <p>The third stuff is the generator. Think it as serial promises.<br>That\'s awesome!</p> <highlight> &lt;my-tag opts=\\{ generator } /&gt;<br> &lt;script&gt;<br> &nbsp;&nbsp;this.generator = function*() \\{ while (true) \\{<br> &nbsp;&nbsp;&nbsp;&nbsp;yield new Promise(function(resolve, reject) \\{<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;setTimeout(function() \\{<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;resolve(\\{ message: hello())<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}, 1000)<br> &nbsp;&nbsp;&nbsp;&nbsp;})<br> &nbsp;&nbsp;}}<br> &lt;/script&gt; </highlight> <my-tag opts="{ gen }"></my-tag> <h2>routings in html</h2> <p>The routing is needed to be more frexible.<br> Nowaday, routing with the entire page is impractical.<br> You may wanna change just the part of HTML instead of the entire page.<br> Here is what we wanted to do.</p> <highlight> &lt;router&gt;<br> &nbsp;&nbsp;&lt;route path="/"&gt;&lt;my-tag message="hello world" /&gt;&lt;/route&gt;<br> &nbsp;&nbsp;&lt;route path="lorem"&gt;&lt;my-tag message="Lorem Ipsum is..." /&gt;&lt;/route&gt;<br> &nbsp;&nbsp;&lt;route path="member/:person"&gt;&lt;my-tag message="$person" /&gt;&lt;/route&gt;<br> &nbsp;&nbsp;&lt;route path="merol" redirect="lorem" /&gt;<br> &nbsp;&nbsp;&lt;route path="*"&gt;&lt;my-tag message="not found." /&gt;&lt;/route&gt;<br> &lt;/router&gt;<br> </highlight> <navi> <ul> <li><a href="#lorem">#lorem</a></li> <li><a href="#member/Tom">#member/Tom</a></li> <li><a href="#merol">#merol</a></li> <li><a href="#not/found">#not/found</a></li> </ul> </navi> <router> <route path="/"><my-tag message="hello world" desc="slash(/) matchs url without hash"></my-tag></route> <route path="lorem"><my-tag message="Lorem Ipsum is simply dummy text of the printing and typesetting industry." desc="\'lorem\' matchs exact \'lorem\'"></my-tag></route> <route path="member/:person"><my-tag message="$person" desc="\'member/:person\' matchs anything starting with \'member/\'"></my-tag></route> <route path="merol" redirect="lorem"></route> <route path="*"><my-tag message="not found." desc="asterisk(*) matchs any url"></my-tag></route> </router> <h2>controllers, kind of</h2> <h3>1. introduce event listeners</h3> <p>Yield an array of listeners like this:</p> <highlight> var evts = [\\{<br> &nbsp;&nbsp;key: \'click\',<br> &nbsp;&nbsp;callback: function (e) \\{ /* do something cool */ }<br> }]<br> yield \\{ listeners: evts } </highlight> <p>If you\'re familier with deferred concept, you can resolve the promise inside the listener.</p> <highlight> var deferred = new Deferred()<br> var evts = [\\{<br> &nbsp;&nbsp;key: \'click\',<br> &nbsp;&nbsp;callback: function (e) \\{ deferred.resolve(\\{ message: hello() }) }<br> }]<br> yield \\{ listeners: evts }<br> yield deferred.promise </highlight> <my-tag opts="{ gen2 }"></my-tag> <h3>2. combinations</h3> <p>OK, we have generators and routers. Then, combine them.</p> <navi> <ul> <li><a href="#member/Tom">#member/Tom</a></li> <li><a href="#member/Yayoi">#member/Yayoi</a></li> <li><a href="#member/John">#member/John</a></li> </ul> </navi> <router> <route path="member/:person"><my-tag opts="{ parent.parent.gen3 }"></my-tag></route> <route path="*"><my-tag message="not found." desc="Click the links above."></my-tag></route> </router> <router> <route path="member/:person"><my-tag opts="{ parent.parent.gen4 }"></my-tag></route> <route path="*"><my-tag message="not found." desc="Click the links above."></my-tag></route> </router> <footer> <p><a href="https://github.com/cognitom/ikki">GitHub</a></p> </footer>', 'app , [riot-tag="app"] { display: block; text-align: center; } app > header , [riot-tag="app"] > header { padding: 8em 0; background: #8A97A1; color: white; text-shadow: 0 0 2px rgba(0,0,0,.5); } app > header h1 , [riot-tag="app"] > header h1 { margin: 0; font-size: 340%; } app > header p , [riot-tag="app"] > header p { margin: 0; } app > p , [riot-tag="app"] > p { line-height: 1.4em; padding: 0 .5em; } app > h2 , [riot-tag="app"] > h2 { margin: 3em 0 .5em; color: #8A97A1; } app > h3 , [riot-tag="app"] > h3 { margin: 3em 0 .5em; } app > footer , [riot-tag="app"] > footer { border-top: 1px solid #ccc; margin: 3em 0 0; padding: 2em 0; background: #f7f7f7; } app > navi , [riot-tag="app"] > navi { } app > navi ul , [riot-tag="app"] > navi ul { list-style: none; padding: .5em; } app > navi li , [riot-tag="app"] > navi li { display: inline-block; } app > navi li:after , [riot-tag="app"] > navi li:after { content: "-"; margin: 0 1em; } app > navi li:last-child:after , [riot-tag="app"] > navi li:last-child:after { content: none; } app > navi a , [riot-tag="app"] > navi a { } app a , [riot-tag="app"] a { color: #2887D7; text-decoration: none; } app .billboard , [riot-tag="app"] .billboard { background: #ffd700; color: #8A97A1; padding: 2em; } app .billboard a , [riot-tag="app"] .billboard a { color: inherit; font-weight: bold; }', function (opts) {
  var Hello = require('./hello.es');

  this.obj = { message: 'Hi!', desc: 'This is just an object.' };

  this.prom = new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve({ message: 'Hello!', desc: 'You can give a promise.' });
    }, 10000);
  });

  this.gen = regeneratorRuntime.mark(function callee$1$0() {
    var hello;
    return regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          hello = pick(HELLO_I18N);

        case 1:
          if (!true) {
            context$2$0.next = 6;
            break;
          }

          context$2$0.next = 4;
          return new Promise(function (resolve, reject) {
            setTimeout(function () {
              resolve({ message: hello(), desc: 'Generator is awesome!' });
            }, 1000);
          });

        case 4:
          context$2$0.next = 1;
          break;

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, callee$1$0, this);
  });

  this.gen2 = regeneratorRuntime.mark(function callee$1$0() {
    var hello, resolve, deferred, pack, evt;
    return regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          pack = function pack() {
            return {
              message: hello(),
              desc: 'Click to change the word.'
            };
          };

          hello = pick(HELLO_I18N);
          resolve = null;
          deferred = new Deferred();
          evt = {
            key: 'click',
            callback: function callback(e) {
              deferred.resolve(pack());
              deferred = new Deferred();
            }
          };
          context$2$0.next = 7;
          return { listeners: [evt] };

        case 7:
          context$2$0.next = 9;
          return pack();

        case 9:
          if (!true) {
            context$2$0.next = 14;
            break;
          }

          context$2$0.next = 12;
          return deferred.promise;

        case 12:
          context$2$0.next = 9;
          break;

        case 14:
        case 'end':
          return context$2$0.stop();
      }
    }, callee$1$0, this);
  });

  this.gen3 = regeneratorRuntime.mark(function callee$1$0(route) {
    var name, hello, pack;
    return regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          pack = function pack() {
            return {
              message: hello() + ' ' + name + '!',
              desc: 'You can pass the routing info to the generator.'
            };
          };

          name = 'world';
          hello = pick(HELLO_I18N);

          if (route && route.param) name = route.param.person || name;

          context$2$0.next = 6;
          return pack();

        case 6:
          if (!true) {
            context$2$0.next = 11;
            break;
          }

          context$2$0.next = 9;
          return new Promise(function (resolve, reject) {
            setTimeout(function () {
              resolve(pack());
            }, 1000);
          });

        case 9:
          context$2$0.next = 6;
          break;

        case 11:
        case 'end':
          return context$2$0.stop();
      }
    }, callee$1$0, this);
  });

  this.gen4 = new Hello().start();

  var HELLO_I18N = ['Hello', 'こんにちは', '你好', 'Salut', 'Hallo'];
  var pick = function pick(arr) {
    var n = -1;return function () {
      return arr[n = (n + Math.ceil(Math.random() * (arr.length - 1))) % arr.length];
    };
  };
  function Deferred() {
    this.promise = new Promise((function (resolve, reject) {
      this._resolve = resolve;
      this._reject = reject;
    }).bind(this));
  }
  Deferred.prototype.resolve = function (value) {
    this._resolve(value);
  };
  Deferred.prototype.reject = function (reason) {
    this._reject(reason);
  };
});

riot.tag('highlight', '<yield></yield>', 'highlight , [riot-tag="highlight"] { display: block; font-family: monospace; border-top: 1px solid #ddd; border-bottom: 1px solid #ddd; padding: 1em 8% !important; text-align: left; }', function (opts) {
  this.on('mount', function () {
    hljs.highlightBlock(this.root);
  });
});

riot.tag('my-tag', '<p onclick="{ click }">{ opts.message || \'Well...\' }</p> <footer>{ opts.desc || \'Loading...\' }</footer>', 'my-tag , [riot-tag="my-tag"] { display: block; border: 1px solid #a7b5c1; border-radius: .3em; margin: 1em 3em; background: #a7b5c1; color: white; } my-tag p , [riot-tag="my-tag"] p { line-height: 1.2em; margin: 0; padding: .8em; font-size: 150%; } my-tag footer , [riot-tag="my-tag"] footer { font-size: 90%; color: #a7b5c1; padding: .8em; background: #fff; border-bottom-left-radius: .3em; border-bottom-right-radius: .3em; }', function (opts) {
  this.mixin('ikki');

  this.click = (function (e) {
    this.trigger('click', e);
  }).bind(this);
});
// listen the event
// quickly yield at first
// quickly yield at first

},{"./hello.es":2,"regenerator/runtime":4}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _libOshioEs = require('../lib/Oshio.es');

var _libOshioEs2 = _interopRequireDefault(_libOshioEs);

var HELLO_I18N = ['Hello', 'こんにちは', '你好', 'Salut', 'Hallo'];

var Hello = (function (_Oshio) {
  function Hello() {
    _classCallCheck(this, Hello);

    if (_Oshio != null) {
      _Oshio.apply(this, arguments);
    }
  }

  _inherits(Hello, _Oshio);

  _createClass(Hello, [{
    key: 'direction',
    value: function direction(path, query, param) {
      var _this = this;

      var name = param.person || 'world';
      var hello = randomPick(HELLO_I18N);

      var pack = function pack(str) {
        return {
          message: hello() + ' ' + str + '!',
          desc: 'Hmmmmm.'
        };
      };

      this.on('click', function () {
        _this.push(pack(name));
      });
      this.push(pack(name));
    }
  }]);

  return Hello;
})(_libOshioEs2['default']);

function randomPick(arr) {
  var n = -1;
  return function () {
    n = (n + Math.ceil(Math.random() * (arr.length - 1))) % arr.length;
    return arr[n];
  };
}

exports['default'] = Hello;
module.exports = exports['default'];

},{"../lib/Oshio.es":3}],3:[function(require,module,exports){
/**
 * Oshio
 */

/*class Deferred {

  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this._resolve = resolve
      this._reject = reject
    })
  }

  resolve(value) { this._resolve(value) }
  reject(reason) { this._reject(reason) }

}*/
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function Deferred() {
  this.promise = new Promise((function (resolve, reject) {
    this._resolve = resolve;
    this._reject = reject;
  }).bind(this));
}
Deferred.prototype.resolve = function (value) {
  this._resolve(value);
};
Deferred.prototype.reject = function (reason) {
  this._reject(reason);
};

var Oshio = (function () {
  function Oshio() {
    _classCallCheck(this, Oshio);
  }

  _createClass(Oshio, [{
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
      var _this = this;

      // TODO: remoeve setTImeout
      setTimeout(function () {
        _this.push({
          listeners: [{ key: key, callback: callback }]
        });
      }, 1000);
    }
  }]);

  return Oshio;
})();

exports.Deferred = Deferred;
exports['default'] = Oshio;

/* extend and override this method */

},{}],4:[function(require,module,exports){
(function (global){
/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var hasOwn = Object.prototype.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var iteratorSymbol =
    typeof Symbol === "function" && Symbol.iterator || "@@iterator";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided, then outerFn.prototype instanceof Generator.
    var generator = Object.create((outerFn || Generator).prototype);

    generator._invoke = makeInvokeMethod(
      innerFn, self || null,
      new Context(tryLocsList || [])
    );

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = "GeneratorFunction";

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    genFun.__proto__ = GeneratorFunctionPrototype;
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    return new Promise(function(resolve, reject) {
      var generator = wrap(innerFn, outerFn, self, tryLocsList);
      var callNext = step.bind(generator, "next");
      var callThrow = step.bind(generator, "throw");

      function step(method, arg) {
        var record = tryCatch(generator[method], generator, arg);
        if (record.type === "throw") {
          reject(record.arg);
          return;
        }

        var info = record.arg;
        if (info.done) {
          resolve(info.value);
        } else {
          Promise.resolve(info.value).then(callNext, callThrow);
        }
      }

      callNext();
    });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          if (method === "return" ||
              (method === "throw" && delegate.iterator[method] === undefined)) {
            // A return or throw (when the delegate iterator has no throw
            // method) always terminates the yield* loop.
            context.delegate = null;

            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            var returnMethod = delegate.iterator["return"];
            if (returnMethod) {
              var record = tryCatch(returnMethod, delegate.iterator, arg);
              if (record.type === "throw") {
                // If the return method threw an exception, let that
                // exception prevail over the original return or throw.
                method = "throw";
                arg = record.arg;
                continue;
              }
            }

            if (method === "return") {
              // Continue with the outer return, now that the delegate
              // iterator has been terminated.
              continue;
            }
          }

          var record = tryCatch(
            delegate.iterator[method],
            delegate.iterator,
            arg
          );

          if (record.type === "throw") {
            context.delegate = null;

            // Like returning generator.throw(uncaught), but without the
            // overhead of an extra function call.
            method = "throw";
            arg = record.arg;
            continue;
          }

          // Delegate generator ran and handled its own exceptions so
          // regardless of what the method was, we continue as if it is
          // "next" with an undefined arg.
          method = "next";
          arg = undefined;

          var info = record.arg;
          if (info.done) {
            context[delegate.resultName] = info.value;
            context.next = delegate.nextLoc;
          } else {
            state = GenStateSuspendedYield;
            return info;
          }

          context.delegate = null;
        }

        if (method === "next") {
          if (state === GenStateSuspendedYield) {
            context.sent = arg;
          } else {
            delete context.sent;
          }

        } else if (method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw arg;
          }

          if (context.dispatchException(arg)) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            method = "next";
            arg = undefined;
          }

        } else if (method === "return") {
          context.abrupt("return", arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          var info = {
            value: record.arg,
            done: context.done
          };

          if (record.arg === ContinueSentinel) {
            if (context.delegate && method === "next") {
              // Deliberately forget the last sent value so that we don't
              // accidentally pass it on to the delegate.
              arg = undefined;
            }
          } else {
            return info;
          }

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(arg) call above.
          method = "throw";
          arg = record.arg;
        }
      }
    };
  }

  function defineGeneratorMethod(method) {
    Gp[method] = function(arg) {
      return this._invoke(method, arg);
    };
  }
  defineGeneratorMethod("next");
  defineGeneratorMethod("throw");
  defineGeneratorMethod("return");

  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset();
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function() {
      this.prev = 0;
      this.next = 0;
      this.sent = undefined;
      this.done = false;
      this.delegate = null;

      this.tryEntries.forEach(resetTryEntry);

      // Pre-initialize at least 20 temporary variables to enable hidden
      // class optimizations for simple generators.
      for (var tempIndex = 0, tempName;
           hasOwn.call(this, tempName = "t" + tempIndex) || tempIndex < 20;
           ++tempIndex) {
        this[tempName] = null;
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;
        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.next = finallyEntry.finallyLoc;
      } else {
        this.complete(record);
      }

      return ContinueSentinel;
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = record.arg;
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
