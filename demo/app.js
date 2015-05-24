(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var regeneratorRuntime = require('regenerator/runtime');riot.tag('app-section1', '<h2>pass a promise/generator, just like an object</h2> <h3>1. objects</h3> <p>At the first, see the traditional way to give the value.</p> <highlight> &lt;my-tag message="Hi!" /&gt;<br> </highlight> <p>Then, see the ikki\'s way. You can give the data as an object.<br>Great, but boring? OK, go ahead.</p> <highlight> &lt;my-tag opts=\\{ object } /&gt;<br> &lt;script&gt;<br> &nbsp;&nbsp;this.object = \\{ message: \'Hi!\' }<br> &lt;/script&gt; </highlight> <my-tag opts="{ obj }"></my-tag> <h3>2. functions</h3> <p>If you pass the function, the component will get the result of the function. It\'s useful when you want to handle the routing information or do something each time.</p> <highlight> &lt;my-tag opts=\\{ func } /&gt;<br> &lt;script&gt;<br> &nbsp;&nbsp;this.func = function(route) \\{<br> &nbsp;&nbsp;&nbsp;&nbsp;return \\{ message: "It\'s " + now + "." }<br> &nbsp;&nbsp;}<br> &lt;/script&gt; </highlight> <my-tag opts="{ func }"></my-tag> <h3>3. promises</h3> <p>We can give a promise to the tag. It\'ll make really easy to do any async process.</p> <highlight> &lt;my-tag opts=\\{ promise } /&gt;<br> &lt;script&gt;<br> &nbsp;&nbsp;this.promise = new Promise(function(resolve, reject) \\{<br> &nbsp;&nbsp;&nbsp;&nbsp;setTimeout(function() \\{<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;resolve(\\{ message: \'Hello!\' })<br> &nbsp;&nbsp;&nbsp;&nbsp;}, 10000)<br> &nbsp;&nbsp;})<br> &lt;/script&gt; </highlight> <my-tag opts="{ prom }"></my-tag> <h3>4. generators</h3> <p>The last stuff is the generator. Think it as serial promises.<br>That\'s awesome!</p> <highlight> &lt;my-tag opts=\\{ generator } /&gt;<br> &lt;script&gt;<br> &nbsp;&nbsp;this.generator = function*() \\{ while (true) \\{<br> &nbsp;&nbsp;&nbsp;&nbsp;yield new Promise(function(resolve, reject) \\{<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;setTimeout(function() \\{<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;resolve(\\{ message: hello())<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}, 1000)<br> &nbsp;&nbsp;&nbsp;&nbsp;})<br> &nbsp;&nbsp;}}<br> &lt;/script&gt; </highlight> <my-tag opts="{ gen }"></my-tag>', function (opts) {
  this.obj = { message: 'Hi!', desc: 'This is just an object.' };

  this.func = function (route) {
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    var now = h % 12 + (m < 10 ? ':0' : ':') + m + (h < 12 ? 'am' : 'pm');
    return { message: 'It\'s ' + now + '.', desc: 'This is a function.' };
  };

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

  var HELLO_I18N = ['Hello', 'こんにちは', '你好', 'Salut', 'Hallo'];
  var pick = function pick(arr) {
    var n = -1;return function () {
      return arr[n = (n + Math.ceil(Math.random() * (arr.length - 1))) % arr.length];
    };
  };
});

riot.tag('app-section2', '<h2>routings in html</h2> <p>Nowaday, routing with the entire page is impractical.<br> The routing is needed to be more frexible.<br> You wanna change just the part of HTML instead of the entire page, doesn\'t you?<br> Here is what you wanted to do.</p> <h3>1. basic routings</h3> <highlight> &lt;router&gt;<br> &nbsp;&nbsp;&lt;route path="/"&gt;&lt;my-tag message="hello world" /&gt;&lt;/route&gt;<br> &nbsp;&nbsp;&lt;route path="lorem"&gt;&lt;my-tag message="Lorem Ipsum is..." /&gt;&lt;/route&gt;<br> &nbsp;&nbsp;&lt;route path="member/:person"&gt;&lt;my-tag message="$person" /&gt;&lt;/route&gt;<br> &nbsp;&nbsp;&lt;route path="merol" redirect="lorem" /&gt;<br> &nbsp;&nbsp;&lt;route path="*"&gt;&lt;my-tag message="not found." /&gt;&lt;/route&gt;<br> &lt;/router&gt;<br> </highlight> <navi> <ul> <li><a href="#lorem">#lorem</a></li> <li><a href="#member/Tom">#member/Tom</a></li> <li><a href="#merol">#merol</a></li> <li><a href="#not/found">#not/found</a></li> </ul> </navi> <router> <route path="/"><my-tag message="hello world" desc="slash(/) matchs url without hash"></my-tag></route> <route path="lorem"><my-tag message="Lorem Ipsum is simply dummy text of the printing and typesetting industry." desc="\'lorem\' matchs exact \'lorem\'"></my-tag></route> <route path="member/:person"><my-tag message="$person" desc="\'member/:person\' matchs anything starting with \'member/\'"></my-tag></route> <route path="merol" redirect="lorem"></route> <route path="*"><my-tag message="not found." desc="asterisk(*) matchs any url"></my-tag></route> </router> <h3>2. pass the routing info to functions/generators</h3> <p>Of cause, the routing info can be passed to functions/generators via the argument.</p> <highlight> &lt;router&gt;<br> &nbsp;&nbsp;&lt;route path="hour/:hour"&gt;&lt;my-tag opts=\\{ generator } /&gt;&lt;/route&gt;<br> &lt;/router&gt;<br> &lt;script&gt;<br> &nbsp;&nbsp;this.generator = function*(route) \\{<br> &nbsp;&nbsp;&nbsp;&nbsp;// route.path: hour/10<br> &nbsp;&nbsp;&nbsp;&nbsp;// route.query: \\{}<br> &nbsp;&nbsp;&nbsp;&nbsp;// route.param: \\{ hour: 10 }<br> &nbsp;&nbsp;}<br> &lt;/script&gt; </highlight> <p>Click the links below to try it.</p> <navi> <ol> <li> <a href="#hour/10">#hour/10</a> <span each="{ msg, i in greeting.morning }">{ msg }</span> </li> <li> <a href="#hour/14">#hour/14</a> <span each="{ msg, i in greeting.hello }">{ msg }</span> </li> <li> <a href="#hour/18">#hour/18</a> <span each="{ msg, i in greeting.evening }">{ msg }</span> </li> </ol> </navi> <router> <route path="hour/:hour"><my-tag opts="{ parent.parent.gen3 }"></my-tag></route> <route path="*"><my-tag message="Click the links above." desc="..."></my-tag></route> </router>', 'app-section2 navi ol , [riot-tag="app-section2"] navi ol { border: 1px solid #a7b5c1; border-radius: .3em; margin: 1em 3em; padding: 0; color: #a7b5c1; } app-section2 navi ol li , [riot-tag="app-section2"] navi ol li { display: block; border-top: 1px solid #a7b5c1; padding: .2em 0 .2em 1em; text-align: left; overflow: hidden; white-space: nowrap; } app-section2 navi ol li:first-child , [riot-tag="app-section2"] navi ol li:first-child { border-top: none; } app-section2 navi ol li a , [riot-tag="app-section2"] navi ol li a { margin-right: .2em; padding-right: .4em; border-right: 1px dotted #a7b5c1; } app-section2 navi ol li span , [riot-tag="app-section2"] navi ol li span { background-color: #a7b5c1; color: white; border-radius: .3em; padding: .1em .3em; margin: 0 .1em; font-size: 80%; }', function (opts) {
  var Deferred = require('../').Deferred;
  var GREETING = {
    morning: ['Good morning', 'おはよう', '早上好', 'Bonjour', 'Buon giorno'],
    hello: ['Hello', 'こんにちは', '你好', 'Salut', 'Ciao'],
    evening: ['Good evening', 'こんばんは', '晩上好', 'Bonsoir', 'Buona sera']
  };

  this.greeting = GREETING;

  this.gen3 = regeneratorRuntime.mark(function callee$1$0(route) {
    var hour, w, n;
    return regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          hour = route && route.param ? (route.param.hour || 12) % 24 : 12;
          w = hour < 12 ? 'morning' : hour < 17 ? 'hello' : 'evening';
          n = 0;
          context$2$0.next = 5;
          return { message: 'It\'s ' + hour + ' o\'clock.' };

        case 5:
          if (!true) {
            context$2$0.next = 10;
            break;
          }

          context$2$0.next = 8;
          return new Promise(function (resolve, reject) {
            setTimeout(function () {
              resolve({
                message: GREETING[w][n],
                desc: 'You can pass the routing info to the generator.'
              });
              n = (n + 1) % GREETING[w].length;
            }, 1500);
          });

        case 8:
          context$2$0.next = 5;
          break;

        case 10:
        case 'end':
          return context$2$0.stop();
      }
    }, callee$1$0, this);
  });
});

riot.tag('app-section3', '<h2>listen to events on components</h2> <p>In short, yield an array of listeners like this:</p> <highlight> var evts = [\\{<br> &nbsp;&nbsp;key: \'click\',<br> &nbsp;&nbsp;callback: function (e) \\{ /* do something cool */ }<br> }]<br> yield \\{ listeners: evts } </highlight> <p>Basically, ikki provide no way to communicate with component and controllers directly, for the sake of separation. But this `listeners` is only an exception.</p> <p>If you\'re familier with deferred concept, you can resolve the promise inside the listener.</p> <highlight> var deferred = new Deferred()<br> var evts = [\\{<br> &nbsp;&nbsp;key: \'click\',<br> &nbsp;&nbsp;callback: function (e) \\{ deferred.resolve(\\{ message: hello() }) }<br> }]<br> yield \\{ listeners: evts }<br> yield deferred.promise </highlight> <my-dialog opts="{ gen2 }"></my-dialog>', function (opts) {
  var Deferred = require('../').Deferred;
  var HELLO = ['Hello', 'こんにちは', '你好', 'Salut', 'Hallo'];

  this.gen2 = regeneratorRuntime.mark(function callee$1$0() {
    var deferred, n, evt;
    return regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          deferred = new Deferred();
          n = 0;
          evt = {
            key: 'click',
            callback: function callback(e) {
              deferred.resolve({ message: HELLO[n] });
              deferred = new Deferred();
              n = (n + 1) % HELLO.length;
            }
          };
          context$2$0.next = 5;
          return { listeners: [evt] };

        case 5:
          context$2$0.next = 7;
          return { message: 'Click me!', btns: ['Next'] };

        case 7:
          if (!true) {
            context$2$0.next = 12;
            break;
          }

          context$2$0.next = 10;
          return deferred.promise;

        case 10:
          context$2$0.next = 7;
          break;

        case 12:
        case 'end':
          return context$2$0.stop();
      }
    }, callee$1$0, this);
  });
});

riot.tag('app-section4', '<h2>making generators with helpers</h3> <p>ikki has several built-in helpers. (named after Japanese historical cities\b)</p> <p>These helpers wrap generators and event subscriptions to handle them with ease.</p> <h3>1. Kyoto</h3> <p><code>Kyoto</code> takes event-driven approach. And you don\'t have to care about the generator which is relatively new in JavaScript.</p> <highlight> var kyoto = require(\'ikki/lib/kyoto.es\')<br> var HELLO = [\'Hello\', \'こんにちは\', \'你好\', \'Salut\', \'Hallo\']<br> <br> this.hello = kyoto(function(push, path, query, param) {<br> &nbsp;&nbsp;push(\\{ message: \'Click me!\', btns: [\'Next\'] })<br> }, {<br> &nbsp;&nbsp;\'click\': (push, data) => \\{<br> &nbsp;&nbsp;&nbsp;&nbsp;push(\\{ message: HELLO[n = ++n % HELLO.length] + \'!\' })<br> &nbsp;&nbsp;}<br> }) </highlight> <my-dialog opts="{ hello }"></my-dialog> <h3>2. Edo</h3> <p>On the other hand, <code>edo</code> is the generator based flow-controler. If you need serial/branching interactions with user\'s input, this will be a perfect solution.</p> <highlight> var edo = require(\'ikki/lib/edo.es\')<br> <br> this.dialog = edo(\'click\', function* direction(path, query, param) \\{<br> &nbsp;&nbsp;yield \\{ message: \'Good morning!\', btns: [\'Hi\'] }<br> &nbsp;&nbsp;let fruit = yield \\{ message: \'Which do you like?\', btns: [\'apple\', \'banana\'] }<br> &nbsp;&nbsp;yield \\{ message: "OK, I\'ll give you this " + fruit + \'.\', btns: [\'Thanks\'] }<br> &nbsp;&nbsp;yield \\{ message: \'See you!\', btns: [\'Bye\'] }<br> }) </highlight> <my-dialog opts="{ dialog }"></my-dialog>', function (opts) {
  var ikki = require('../');
  var edo = ikki.edo;
  var kyoto = ikki.kyoto;
  var HELLO = ['Hello', 'こんにちは', '你好', 'Salut', 'Hallo'];

  var n = -1;
  this.hello = kyoto(function (push, path, query, param) {
    push({ message: 'Click me!', btns: ['Next'] });
  }, {
    'click': function click(push, data) {
      push({ message: HELLO[n = ++n % HELLO.length] + '!' });
    }
  });

  this.dialog = edo('click', regeneratorRuntime.mark(function direction(path, query, param) {
    var fruit;
    return regeneratorRuntime.wrap(function direction$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          if (!true) {
            context$2$0.next = 12;
            break;
          }

          context$2$0.next = 3;
          return { message: 'Good morning!', btns: ['Hi'] };

        case 3:
          context$2$0.next = 5;
          return { message: 'Which do you like?', btns: ['apple', 'banana'] };

        case 5:
          fruit = context$2$0.sent;
          context$2$0.next = 8;
          return { message: 'OK, I\'ll give you this ' + fruit + '.', btns: ['Thanks'] };

        case 8:
          context$2$0.next = 10;
          return { message: 'See you!', btns: ['Bye'] };

        case 10:
          context$2$0.next = 0;
          break;

        case 12:
        case 'end':
          return context$2$0.stop();
      }
    }, direction, this);
  }));
});

riot.tag('app', '<header> <h1>ikki</h1> <p>ikki is not flux</p> </header> <section class="billboard"> <h2>deadly simple &amp; html-centric</h2> <p>The extention toolkit for <a href="https://muut.com/riotjs/">Riot.js</a></p> <img src="demo/one-way.png"> <img src="demo/routing.png"> </section> <section riot-tag="app-section1"></section> <section riot-tag="app-section2"></section> <section riot-tag="app-section3"></section> <section riot-tag="app-section4"></section> <footer> <p><a href="https://github.com/cognitom/ikki">GitHub</a></p> </footer>', 'app , [riot-tag="app"] { display: block; text-align: center; } app > header , [riot-tag="app"] > header { padding: 8em 0; background: #8A97A1; color: white; text-shadow: 0 0 2px rgba(0,0,0,.5); } app > header h1 , [riot-tag="app"] > header h1 { margin: 0; font-size: 340%; } app > header p , [riot-tag="app"] > header p { margin: 0; } app section > p , [riot-tag="app"] section > p { line-height: 1.4em; padding: 0 .5em; } app section > h2 , [riot-tag="app"] section > h2 { margin: 3em 0 .5em; color: #8A97A1; } app section > h3 , [riot-tag="app"] section > h3 { margin: 3em 0 .5em; } app > footer , [riot-tag="app"] > footer { border-top: 1px solid #ccc; margin: 3em 0 0; padding: 2em 0; background: #f7f7f7; } app navi ul , [riot-tag="app"] navi ul { list-style: none; padding: .5em; } app navi ul li , [riot-tag="app"] navi ul li { display: inline-block; } app navi ul li:after , [riot-tag="app"] navi ul li:after { content: "-"; margin: 0 1em; } app navi ul li:last-child:after , [riot-tag="app"] navi ul li:last-child:after { content: none; } app navi a , [riot-tag="app"] navi a { } app a , [riot-tag="app"] a { color: #2887D7; text-decoration: none; } app .billboard , [riot-tag="app"] .billboard { background: #ffd700; color: #8A97A1; padding: 2em; } app .billboard > h2 , [riot-tag="app"] .billboard > h2 { margin: 1em .5em .5em; } app .billboard a , [riot-tag="app"] .billboard a { color: inherit; font-weight: bold; }', function (opts) {});

riot.tag('highlight', '<yield></yield>', 'highlight , [riot-tag="highlight"] { display: block; font-family: monospace; border-top: 1px solid #ddd; border-bottom: 1px solid #ddd; padding: 1em 8% !important; text-align: left; }', function (opts) {
  this.on('mount', function () {
    hljs.highlightBlock(this.root);
  });
});

riot.tag('my-dialog', '<p>{ opts.message || \'Well...\' }</p> <footer> <button each="{ name, i in opts.btns }" onclick="{ parent.click }">{ name }</button> </footer>', 'my-dialog , [riot-tag="my-dialog"] { display: block; border: 1px solid #a7b5c1; border-radius: .3em; margin: 1em 3em; background: #a7b5c1; color: white; } my-dialog p , [riot-tag="my-dialog"] p { line-height: 1.2em; margin: 0; padding: .8em; font-size: 150%; } my-dialog footer , [riot-tag="my-dialog"] footer { font-size: 90%; color: #a7b5c1; padding: .8em; background: #fff; border-bottom-left-radius: .3em; border-bottom-right-radius: .3em; } my-dialog button , [riot-tag="my-dialog"] button { margin: 0 .2em }', function (opts) {
  this.mixin('ikki');

  this.click = (function (e) {
    this.trigger('click', e.item.name);
  }).bind(this);
});

riot.tag('my-tag', '<p onclick="{ click }">{ opts.message || \'Well...\' }</p> <footer>{ opts.desc || \'Loading...\' }</footer>', 'my-tag , [riot-tag="my-tag"] { display: block; border: 1px solid #a7b5c1; border-radius: .3em; margin: 1em 3em; background: #a7b5c1; color: white; } my-tag p , [riot-tag="my-tag"] p { line-height: 1.2em; margin: 0; padding: .8em; font-size: 150%; } my-tag footer , [riot-tag="my-tag"] footer { font-size: 90%; color: #a7b5c1; padding: .8em; background: #fff; border-bottom-left-radius: .3em; border-bottom-right-radius: .3em; }', function (opts) {
  this.mixin('ikki');

  this.click = (function (e) {
    this.trigger('click', e);
  }).bind(this);
});
// quickly yield at first
// listen the event
// quickly yield at first

},{"../":2,"regenerator/runtime":3}],2:[function(require,module,exports){
/*!
 * ikki (http://cognitom.github.io/ikki/)
 * Copyright 2015 Tsutomu Kawamura.
 * Licensed under MIT
 */
'use strict';

;(function (window) {

  var riot = !window || !window.riot ? require('riot') : window.riot;

  riot.tag('route', ' <section if="{ show }"><yield ></yield></section>', function (opts) {
    var self = this;
    self.show = false;

    function match(route, actual) {
      route = route.replace(/^\//, '');
      if ('*' == route) return {};
      var vs = [];
      var re = route.replace(/(^|\/):([^\/]+)/g, function (_, b, p) {
        vs.push(p);
        return b + '([^/]+)';
      });
      var ms = actual.match(new RegExp('^' + re + '$'));
      if (!ms) return null;

      var param = {};
      vs.map(function (v, i) {
        param[v] = ms[i + 1];
      });
      return param;
    }

    self.on('update', function () {
      var path = self.parent.path;
      var query = self.parent.query;
      var param;
      self.show = !self.parent.found && (param = match(opts.path, path)) !== null;
      param = param || {};

      if (!self.show) return;

      if (opts.redirect) {

        if (/^http/.test(opts.redirect)) location.href = opts.redirect;else location.hash = opts.redirect;
      } else {

        self.trigger('urlchanged', { path: path, query: query, param: param });
        self.parent.found = true;
      }
    });
  });

  riot.tag('router', ' <yield ></yield>', function (opts) {
    var self = this;
    var win = window;
    var evt = 'hashchange';
    self.path = '';
    self.query = {};
    self.found = false;

    this.emit = (function (e) {
      var raw = location.href.split('#')[1] || '';
      var path = raw.split('?')[0].replace(/^\/|\/$/g, '');
      var query = {};
      raw.replace(/[?&](.+?)=([^&]*)/g, function (_, k, v) {
        query[k] = v;
      });

      self.path = path;
      self.query = query;
      self.found = false;

      if (e) self.update();
    }).bind(this);

    self.on('mount', function () {
      win.addEventListener ? win.addEventListener(evt, self.emit, false) : win.attachEvent('on' + evt, self.emit);
    });

    self.on('unmount', function () {
      win.removeEventListener ? win.removeEventListener(evt, self.emit, false) : win.detachEvent('on' + evt, self.emit);
    });

    self.emit();
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
    if (!route) return str;
    Object.keys(route.query).map(function (key) {
      str = str.replace(new RegExp('^\\?' + key + '$'), route.query[key]);
    });
    Object.keys(route.param).map(function (key) {
      str = str.replace(new RegExp('^\\$' + key + '$'), route.param[key]);
    });
    return str;
  }

  riot.mixin('ikki', {
    $$version: 0,

    // initialize mixin
    init: function init() {
      var self = this;
      var rt = self.$$findAncestor('route');

      if (rt) {
        // with routing
        rt.on('urlchanged', function (route) {
          self.$$loadOpts(self.opts.opts, route);
          self.one('update', function () {
            Object.keys(self.opts).map(function (key) {
              if ('string' == typeof self.opts[key]) self.opts[key] = replaceRouteVar(self.opts[key], route);
            });
          });
        });
      } else {
        //without routing
        self.$$loadOpts(self.opts.opts);
      }
    },

    $$findAncestor: function $$findAncestor(tagName) {
      tag = this;
      while (tag && tagName != tag.root.tagName.toLowerCase()) tag = tag.parent;
      return tag || null;
    },

    $$loadOpts: function $$loadOpts(opts, route) {
      if (!opts) return;

      var self = this;
      var version = ++self.$$version;

      if ('object' == typeof opts && !opts.then) {

        // 1: object
        self.$$extendOpts(opts);
      } else if ('object' == typeof opts) {

        // 2: promise
        opts.then(function (o) {
          self.$$extendOpts(o) && self.update();
        });
      } else if (opts && 'GeneratorFunction' == opts.constructor.name) {
        (function () {

          // 3: generator

          var process = function (gen) {
            var prom = gen.next().value;
            function setAndGo(o) {
              if (version < self.$$version) return;
              self.$$extendOpts(o) && self.update();
              setTimeout(function () {
                process(gen);
              }, 0);
            }
            if (!prom) return; // end of chain
            if (!prom.then) setAndGo(prom);else prom.then(setAndGo);
          };

          process(route ? opts(route) : opts());
        })();
      } else if ('function' == typeof opts) {

        // 4. function
        self.$$extendOpts(opts(route));
      }
    },

    $$extendOpts: function $$extendOpts(opts) {
      var self = this;
      if (opts.listeners) {
        opts.listeners.map(function (l) {
          self.on(l.key, l.callback);
        });
        delete opts.listeners;
      }
      var keys = Object.keys(opts);
      keys.map(function (key) {
        self.opts[key] = opts[key];
      });
      return keys.length > 0;
    }
  });

  /*!
   * Parent Scope mixin
   */
  riot.mixin('parentScope', {
    // initialize mixin
    init: function init() {
      this._ownPropKeys = [];
      this._ownOptsKeys = [];
      for (var k in this) this._ownPropKeys[k] = true;
      for (var k in this.opts) this._ownOptsKeys[k] = true;

      this.on('update', function () {
        for (var k in this.parent) if (!this._ownPropKeys[k]) this[k] = this.parent[k];
        for (var k in this.parent.opts) if (!this._ownOptsKeys[k]) this.opts[k] = this.parent.opts[k];
      });
    },

    // update the tag object who calls me
    updateCaller: function updateCaller(f) {
      var keys = [];
      for (var k in this.parent._ownPropKeys || this.parent) keys.push(k);
      for (var i = 0; i < keys.length; i++) if (this.parent[keys[i]] === f) {
        this.parent.update();
        return;
      }
      if (this.parent.updateCaller) this.parent.updateCaller(f);
    }
  });

  /**
   * simple deferred implimentation
   */

  'use strict';

  var _createClass = (function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  })();

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }

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

  if (module) {
    module.exports = {
      Deferred: Deferred,
      edo: edo,
      kyoto: kyoto,
      Nara: Nara
    };
  }
})(typeof window != 'undefined' ? window : undefined);

},{"riot":4}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
/* Riot v2.0.15, @license MIT, (c) 2015 Muut Inc. + contributors */

;(function(window) {
  // 'use strict' does not allow us to override the events properties https://github.com/muut/riotjs/blob/dev/lib/tag/update.js#L7-L10
  // it leads to the following error on firefox "setting a property that has only a getter"
  //'use strict'

  var riot = { version: 'v2.0.15', settings: {} },
      ieVersion = checkIE()

riot.observable = function(el) {

  el = el || {}

  var callbacks = {},
      _id = 0

  el.on = function(events, fn) {
    if (typeof fn == 'function') {
      fn._id = typeof fn._id == 'undefined' ? _id++ : fn._id

      events.replace(/\S+/g, function(name, pos) {
        (callbacks[name] = callbacks[name] || []).push(fn)
        fn.typed = pos > 0
      })
    }
    return el
  }

  el.off = function(events, fn) {
    if (events == '*') callbacks = {}
    else {
      events.replace(/\S+/g, function(name) {
        if (fn) {
          var arr = callbacks[name]
          for (var i = 0, cb; (cb = arr && arr[i]); ++i) {
            if (cb._id == fn._id) { arr.splice(i, 1); i-- }
          }
        } else {
          callbacks[name] = []
        }
      })
    }
    return el
  }

  // only single event supported
  el.one = function(name, fn) {
    function on() {
      el.off(name, on)
      fn.apply(el, arguments)
    }
    return el.on(name, on)
  }

  el.trigger = function(name) {
    var args = [].slice.call(arguments, 1),
        fns = callbacks[name] || []

    for (var i = 0, fn; (fn = fns[i]); ++i) {
      if (!fn.busy) {
        fn.busy = 1
        fn.apply(el, fn.typed ? [name].concat(args) : args)
        if (fns[i] !== fn) { i-- }
        fn.busy = 0
      }
    }

    if (callbacks.all && name != 'all') {
      el.trigger.apply(el, ['all', name].concat(args))
    }

    return el
  }

  return el

}
;(function(riot, evt, window) {

  // browsers only
  if (!window) return

  var loc = window.location,
      fns = riot.observable(),
      win = window,
      started = false,
      current

  function hash() {
    return loc.href.split('#')[1] || ''
  }

  function parser(path) {
    return path.split('/')
  }

  function emit(path) {
    if (path.type) path = hash()

    if (path != current) {
      fns.trigger.apply(null, ['H'].concat(parser(path)))
      current = path
    }
  }

  var r = riot.route = function(arg) {
    // string
    if (arg[0]) {
      loc.hash = arg
      emit(arg)

    // function
    } else {
      fns.on('H', arg)
    }
  }

  r.exec = function(fn) {
    fn.apply(null, parser(hash()))
  }

  r.parser = function(fn) {
    parser = fn
  }

  r.stop = function () {
    if (!started) return
    win.removeEventListener ? win.removeEventListener(evt, emit, false) : win.detachEvent('on' + evt, emit)
    fns.off('*')
    started = false
  }

  r.start = function () {
    if (started) return
    win.addEventListener ? win.addEventListener(evt, emit, false) : win.attachEvent('on' + evt, emit)
    started = true
  }

  // autostart the router
  r.start()

})(riot, 'hashchange', window)
/*

//// How it works?


Three ways:

1. Expressions: tmpl('{ value }', data).
   Returns the result of evaluated expression as a raw object.

2. Templates: tmpl('Hi { name } { surname }', data).
   Returns a string with evaluated expressions.

3. Filters: tmpl('{ show: !done, highlight: active }', data).
   Returns a space separated list of trueish keys (mainly
   used for setting html classes), e.g. "show highlight".


// Template examples

tmpl('{ title || "Untitled" }', data)
tmpl('Results are { results ? "ready" : "loading" }', data)
tmpl('Today is { new Date() }', data)
tmpl('{ message.length > 140 && "Message is too long" }', data)
tmpl('This item got { Math.round(rating) } stars', data)
tmpl('<h1>{ title }</h1>{ body }', data)


// Falsy expressions in templates

In templates (as opposed to single expressions) all falsy values
except zero (undefined/null/false) will default to empty string:

tmpl('{ undefined } - { false } - { null } - { 0 }', {})
// will return: " - - - 0"

*/


var brackets = (function(orig, s, b) {
  return function(x) {

    // make sure we use the current setting
    s = riot.settings.brackets || orig
    if (b != s) b = s.split(' ')

    // if regexp given, rewrite it with current brackets (only if differ from default)
    return x && x.test
      ? s == orig
        ? x : RegExp(x.source
                      .replace(/\{/g, b[0].replace(/(?=.)/g, '\\'))
                      .replace(/\}/g, b[1].replace(/(?=.)/g, '\\')),
                    x.global ? 'g' : '')

      // else, get specific bracket
      : b[x]

  }
})('{ }')


var tmpl = (function() {

  var cache = {},
      reVars = /(['"\/]).*?[^\\]\1|\.\w*|\w*:|\b(?:(?:new|typeof|in|instanceof) |(?:this|true|false|null|undefined)\b|function *\()|([a-z_$]\w*)/gi
              // [ 1               ][ 2  ][ 3 ][ 4                                                                                  ][ 5       ]
              // find variable names:
              // 1. skip quoted strings and regexps: "a b", 'a b', 'a \'b\'', /a b/
              // 2. skip object properties: .name
              // 3. skip object literals: name:
              // 4. skip javascript keywords
              // 5. match var name

  // build a template (or get it from cache), render with data
  return function(str, data) {
    return str && (cache[str] = cache[str] || tmpl(str))(data)
  }


  // create a template instance

  function tmpl(s, p) {

    // default template string to {}
    s = (s || (brackets(0) + brackets(1)))

      // temporarily convert \{ and \} to a non-character
      .replace(brackets(/\\{/g), '\uFFF0')
      .replace(brackets(/\\}/g), '\uFFF1')

    // split string to expression and non-expresion parts
    p = split(s, extract(s, brackets(/{/), brackets(/}/)))

    return new Function('d', 'return ' + (

      // is it a single expression or a template? i.e. {x} or <b>{x}</b>
      !p[0] && !p[2] && !p[3]

        // if expression, evaluate it
        ? expr(p[1])

        // if template, evaluate all expressions in it
        : '[' + p.map(function(s, i) {

            // is it an expression or a string (every second part is an expression)
          return i % 2

              // evaluate the expressions
              ? expr(s, true)

              // process string parts of the template:
              : '"' + s

                  // preserve new lines
                  .replace(/\n/g, '\\n')

                  // escape quotes
                  .replace(/"/g, '\\"')

                + '"'

        }).join(',') + '].join("")'
      )

      // bring escaped { and } back
      .replace(/\uFFF0/g, brackets(0))
      .replace(/\uFFF1/g, brackets(1))

    + ';')

  }


  // parse { ... } expression

  function expr(s, n) {
    s = s

      // convert new lines to spaces
      .replace(/\n/g, ' ')

      // trim whitespace, brackets, strip comments
      .replace(brackets(/^[{ ]+|[ }]+$|\/\*.+?\*\//g), '')

    // is it an object literal? i.e. { key : value }
    return /^\s*[\w- "']+ *:/.test(s)

      // if object literal, return trueish keys
      // e.g.: { show: isOpen(), done: item.done } -> "show done"
      ? '[' +

          // extract key:val pairs, ignoring any nested objects
          extract(s,

              // name part: name:, "name":, 'name':, name :
              /["' ]*[\w- ]+["' ]*:/,

              // expression part: everything upto a comma followed by a name (see above) or end of line
              /,(?=["' ]*[\w- ]+["' ]*:)|}|$/
              ).map(function(pair) {

                // get key, val parts
                return pair.replace(/^[ "']*(.+?)[ "']*: *(.+?),? *$/, function(_, k, v) {

                  // wrap all conditional parts to ignore errors
                  return v.replace(/[^&|=!><]+/g, wrap) + '?"' + k + '":"",'

                })

              }).join('')

        + '].join(" ").trim()'

      // if js expression, evaluate as javascript
      : wrap(s, n)

  }


  // execute js w/o breaking on errors or undefined vars

  function wrap(s, nonull) {
    s = s.trim()
    return !s ? '' : '(function(v){try{v='

        // prefix vars (name => data.name)
        + (s.replace(reVars, function(s, _, v) { return v ? '(d.'+v+'===undefined?'+(typeof window == 'undefined' ? 'global.' : 'window.')+v+':d.'+v+')' : s })

          // break the expression if its empty (resulting in undefined value)
          || 'x')

      + '}finally{return '

        // default to empty string for falsy values except zero
        + (nonull === true ? '!v&&v!==0?"":v' : 'v')

      + '}}).call(d)'
  }


  // split string by an array of substrings

  function split(str, substrings) {
    var parts = []
    substrings.map(function(sub, i) {

      // push matched expression and part before it
      i = str.indexOf(sub)
      parts.push(str.slice(0, i), sub)
      str = str.slice(i + sub.length)
    })

    // push the remaining part
    return parts.concat(str)
  }


  // match strings between opening and closing regexp, skipping any inner/nested matches

  function extract(str, open, close) {

    var start,
        level = 0,
        matches = [],
        re = new RegExp('('+open.source+')|('+close.source+')', 'g')

    str.replace(re, function(_, open, close, pos) {

      // if outer inner bracket, mark position
      if(!level && open) start = pos

      // in(de)crease bracket level
      level += open ? 1 : -1

      // if outer closing bracket, grab the match
      if(!level && close != null) matches.push(str.slice(start, pos+close.length))

    })

    return matches
  }

})()

// { key, i in items} -> { key, i, items }
function loopKeys(expr) {
  var ret = { val: expr },
      els = expr.split(/\s+in\s+/)

  if (els[1]) {
    ret.val = brackets(0) + els[1]
    els = els[0].slice(brackets(0).length).trim().split(/,\s*/)
    ret.key = els[0]
    ret.pos = els[1]
  }

  return ret
}

function mkitem(expr, key, val) {
  var item = {}
  item[expr.key] = key
  if (expr.pos) item[expr.pos] = val
  return item
}


/* Beware: heavy stuff */
function _each(dom, parent, expr) {

  remAttr(dom, 'each')

  var template = dom.outerHTML,
      prev = dom.previousSibling,
      root = dom.parentNode,
      rendered = [],
      tags = [],
      checksum

  expr = loopKeys(expr)

  function add(pos, item, tag) {
    rendered.splice(pos, 0, item)
    tags.splice(pos, 0, tag)
  }

  // clean template code
  parent.one('update', function() {
    root.removeChild(dom)

  }).one('premount', function() {
    if (root.stub) root = parent.root

  }).on('update', function() {

    var items = tmpl(expr.val, parent)
    if (!items) return

    // object loop. any changes cause full redraw
    if (!Array.isArray(items)) {
      var testsum = JSON.stringify(items)
      if (testsum == checksum) return
      checksum = testsum

      // clear old items
      each(tags, function(tag) { tag.unmount() })
      rendered = []
      tags = []

      items = Object.keys(items).map(function(key) {
        return mkitem(expr, key, items[key])
      })

    }

    // unmount redundant
    each(rendered, function(item) {
      if (item instanceof Object) {
        // skip existing items
        if (items.indexOf(item) > -1) {
          return
        }
      } else {
        // find all non-objects
        var newItems = arrFindEquals(items, item),
            oldItems = arrFindEquals(rendered, item)

        // if more or equal amount, no need to remove
        if (newItems.length >= oldItems.length) {
          return
        }
      }
      var pos = rendered.indexOf(item),
          tag = tags[pos]

      if (tag) {
        tag.unmount()
        rendered.splice(pos, 1)
        tags.splice(pos, 1)
        // to let "each" know that this item is removed
        return false
      }

    })

    // mount new / reorder
    var prevBase = [].indexOf.call(root.childNodes, prev) + 1
    each(items, function(item, i) {

      // start index search from position based on the current i
      var pos = items.indexOf(item, i),
          oldPos = rendered.indexOf(item, i)

      // if not found, search backwards from current i position
      pos < 0 && (pos = items.lastIndexOf(item, i))
      oldPos < 0 && (oldPos = rendered.lastIndexOf(item, i))

      if (!(item instanceof Object)) {
        // find all non-objects
        var newItems = arrFindEquals(items, item),
            oldItems = arrFindEquals(rendered, item)

        // if more, should mount one new
        if (newItems.length > oldItems.length) {
          oldPos = -1
        }
      }

      // mount new
      var nodes = root.childNodes
      if (oldPos < 0) {
        if (!checksum && expr.key) var _item = mkitem(expr, item, pos)

        var tag = new Tag({ tmpl: template }, {
          before: nodes[prevBase + pos],
          parent: parent,
          root: root,
          item: _item || item
        })

        tag.mount()

        add(pos, item, tag)
        return true
      }

      // change pos value
      if (expr.pos && tags[oldPos][expr.pos] != pos) {
        tags[oldPos].one('update', function(item) {
          item[expr.pos] = pos
        })
        tags[oldPos].update()
      }

      // reorder
      if (pos != oldPos) {
        root.insertBefore(nodes[prevBase + oldPos], nodes[prevBase + (pos > oldPos ? pos + 1 : pos)])
        return add(pos, rendered.splice(oldPos, 1)[0], tags.splice(oldPos, 1)[0])
      }

    })

    rendered = items.slice()

  })

}


function parseNamedElements(root, parent, childTags) {

  walk(root, function(dom) {
    if (dom.nodeType == 1) {
      if(dom.parentNode && dom.parentNode.isLoop) dom.isLoop = 1
      if(dom.getAttribute('each')) dom.isLoop = 1
      // custom child tag
      var child = getTag(dom)

      if (child && !dom.isLoop) {
        var tag = new Tag(child, { root: dom, parent: parent }, dom.innerHTML),
          tagName = child.name,
          ptag = parent,
          cachedTag

        while(!getTag(ptag.root)) {
          if(!ptag.parent) break
          ptag = ptag.parent
        }
        // fix for the parent attribute in the looped elements
        tag.parent = ptag

        cachedTag = ptag.tags[tagName]

        // if there are multiple children tags having the same name
        if (cachedTag) {
          // if the parent tags property is not yet an array
          // create it adding the first cached tag
          if (!Array.isArray(cachedTag))
            ptag.tags[tagName] = [cachedTag]
          // add the new nested tag to the array
          ptag.tags[tagName].push(tag)
        } else {
          ptag.tags[tagName] = tag
        }

        // empty the child node once we got its template
        // to avoid that its children get compiled multiple times
        dom.innerHTML = ''
        childTags.push(tag)
      }

      each(dom.attributes, function(attr) {
        if (/^(name|id)$/.test(attr.name)) parent[attr.value] = dom
      })
    }

  })

}

function parseExpressions(root, tag, expressions) {

  function addExpr(dom, val, extra) {
    if (val.indexOf(brackets(0)) >= 0) {
      var expr = { dom: dom, expr: val }
      expressions.push(extend(expr, extra))
    }
  }

  walk(root, function(dom) {
    var type = dom.nodeType

    // text node
    if (type == 3 && dom.parentNode.tagName != 'STYLE') addExpr(dom, dom.nodeValue)
    if (type != 1) return

    /* element */

    // loop
    var attr = dom.getAttribute('each')
    if (attr) { _each(dom, tag, attr); return false }

    // attribute expressions
    each(dom.attributes, function(attr) {
      var name = attr.name,
        bool = name.split('__')[1]

      addExpr(dom, attr.value, { attr: bool || name, bool: bool })
      if (bool) { remAttr(dom, name); return false }

    })

    // skip custom tags
    if (getTag(dom)) return false

  })

}
function Tag(impl, conf, innerHTML) {

  var self = riot.observable(this),
      opts = inherit(conf.opts) || {},
      dom = mkdom(impl.tmpl),
      parent = conf.parent,
      expressions = [],
      childTags = [],
      root = conf.root,
      item = conf.item,
      fn = impl.fn,
      tagName = root.tagName.toLowerCase(),
      attr = {},
      loopDom

  if (fn && root._tag) {
    root._tag.unmount(true)
  }
  // keep a reference to the tag just created
  // so we will be able to mount this tag multiple times
  root._tag = this

  // create a unique id to this tag
  // it could be handy to use it also to improve the virtual dom rendering speed
  this._id = ~~(new Date().getTime() * Math.random())

  extend(this, { parent: parent, root: root, opts: opts, tags: {} }, item)

  // grab attributes
  each(root.attributes, function(el) {
    attr[el.name] = el.value
  })


  if (dom.innerHTML && !/select/.test(tagName))
    // replace all the yield tags with the tag inner html
    dom.innerHTML = replaceYield(dom.innerHTML, innerHTML)


  // options
  function updateOpts() {
    each(Object.keys(attr), function(name) {
      opts[name] = tmpl(attr[name], parent || self)
    })
  }

  this.update = function(data, init) {
    extend(self, data, item)
    updateOpts()
    self.trigger('update', item)
    update(expressions, self, item)
    self.trigger('updated')
  }

  this.mount = function() {

    updateOpts()

    // initialiation
    fn && fn.call(self, opts)

    toggle(true)

    // parse layout after init. fn may calculate args for nested custom tags
    parseExpressions(dom, self, expressions)

    if (!self.parent) self.update()

    // internal use only, fixes #403
    self.trigger('premount')

    if (fn) {
      while (dom.firstChild) root.appendChild(dom.firstChild)

    } else {
      loopDom = dom.firstChild
      root.insertBefore(loopDom, conf.before || null) // null needed for IE8
    }

    if (root.stub) self.root = root = parent.root
    self.trigger('mount')

  }


  this.unmount = function(keepRootTag) {
    var el = fn ? root : loopDom,
        p = el.parentNode

    if (p) {

      if (parent) {
        // remove this tag from the parent tags object
        // if there are multiple nested tags with same name..
        // remove this element form the array
        if (Array.isArray(parent.tags[tagName])) {
          each(parent.tags[tagName], function(tag, i) {
            if (tag._id == self._id)
              parent.tags[tagName].splice(i, 1)
          })
        } else
          // otherwise just delete the tag instance
          delete parent.tags[tagName]
      } else {
        while (el.firstChild) el.removeChild(el.firstChild)
      }

      if (!keepRootTag)
        p.removeChild(el)

    }


    self.trigger('unmount')
    toggle()
    self.off('*')
    // somehow ie8 does not like `delete root._tag`
    root._tag = null

  }

  function toggle(isMount) {

    // mount/unmount children
    each(childTags, function(child) { child[isMount ? 'mount' : 'unmount']() })

    // listen/unlisten parent (events flow one way from parent to children)
    if (parent) {
      var evt = isMount ? 'on' : 'off'
      parent[evt]('update', self.update)[evt]('unmount', self.unmount)
    }
  }

  // named elements available for fn
  parseNamedElements(dom, this, childTags)


}

function setEventHandler(name, handler, dom, tag, item) {

  dom[name] = function(e) {

    // cross browser event fix
    e = e || window.event
    e.which = e.which || e.charCode || e.keyCode
    e.target = e.target || e.srcElement
    e.currentTarget = dom
    e.item = item

    // prevent default behaviour (by default)
    if (handler.call(tag, e) !== true && !/radio|check/.test(dom.type)) {
      e.preventDefault && e.preventDefault()
      e.returnValue = false
    }

    var el = item ? tag.parent : tag
    el.update()

  }

}

// used by if- attribute
function insertTo(root, node, before) {
  if (root) {
    root.insertBefore(before, node)
    root.removeChild(node)
  }
}

// item = currently looped item
function update(expressions, tag, item) {

  each(expressions, function(expr, i) {

    var dom = expr.dom,
        attrName = expr.attr,
        value = tmpl(expr.expr, tag),
        parent = expr.dom.parentNode

    if (value == null) value = ''

    // leave out riot- prefixes from strings inside textarea
    if (parent && parent.tagName == 'TEXTAREA') value = value.replace(/riot-/g, '')

    // no change
    if (expr.value === value) return
    expr.value = value

    // text node
    if (!attrName) return dom.nodeValue = value

    // remove original attribute
    remAttr(dom, attrName)

    // event handler
    if (typeof value == 'function') {
      setEventHandler(attrName, value, dom, tag, item)

    // if- conditional
    } else if (attrName == 'if') {
      var stub = expr.stub

      // add to DOM
      if (value) {
        stub && insertTo(stub.parentNode, stub, dom)

      // remove from DOM
      } else {
        stub = expr.stub = stub || document.createTextNode('')
        insertTo(dom.parentNode, dom, stub)
      }

    // show / hide
    } else if (/^(show|hide)$/.test(attrName)) {
      if (attrName == 'hide') value = !value
      dom.style.display = value ? '' : 'none'

    // field value
    } else if (attrName == 'value') {
      dom.value = value

    // <img src="{ expr }">
    } else if (attrName.slice(0, 5) == 'riot-') {
      attrName = attrName.slice(5)
      value ? dom.setAttribute(attrName, value) : remAttr(dom, attrName)

    } else {
      if (expr.bool) {
        dom[attrName] = value
        if (!value) return
        value = attrName
      }

      if (typeof value != 'object') dom.setAttribute(attrName, value)

    }

  })

}
function each(els, fn) {
  for (var i = 0, len = (els || []).length, el; i < len; i++) {
    el = els[i]
    // return false -> remove current item during loop
    if (el != null && fn(el, i) === false) i--
  }
  return els
}

function remAttr(dom, name) {
  dom.removeAttribute(name)
}

// max 2 from objects allowed
function extend(obj, from, from2) {
  from && each(Object.keys(from), function(key) {
    obj[key] = from[key]
  })
  return from2 ? extend(obj, from2) : obj
}

function checkIE() {
  if (window) {
    var ua = navigator.userAgent
    var msie = ua.indexOf('MSIE ')
    if (msie > 0) {
      return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10)
    }
    else {
      return 0
    }
  }
}

function optionInnerHTML(el, html) {
  var opt = document.createElement('option'),
      valRegx = /value=[\"'](.+?)[\"']/,
      selRegx = /selected=[\"'](.+?)[\"']/,
      valuesMatch = html.match(valRegx),
      selectedMatch = html.match(selRegx)

  opt.innerHTML = html

  if (valuesMatch) {
    opt.value = valuesMatch[1]
  }

  if (selectedMatch) {
    opt.setAttribute('riot-selected', selectedMatch[1])
  }

  el.appendChild(opt)
}

function mkdom(template) {
  var tagName = template.trim().slice(1, 3).toLowerCase(),
      rootTag = /td|th/.test(tagName) ? 'tr' : tagName == 'tr' ? 'tbody' : 'div',
      el = document.createElement(rootTag)

  el.stub = true

  if (tagName === 'op' && ieVersion && ieVersion < 10) {
    optionInnerHTML(el, template)
  } else {
    el.innerHTML = template
  }
  return el
}

function walk(dom, fn) {
  if (dom) {
    if (fn(dom) === false) walk(dom.nextSibling, fn)
    else {
      dom = dom.firstChild

      while (dom) {
        walk(dom, fn)
        dom = dom.nextSibling
      }
    }
  }
}

function replaceYield (tmpl, innerHTML) {
  return tmpl.replace(/<(yield)\/?>(<\/\1>)?/gim, innerHTML || '')
}

function $$(selector, ctx) {
  ctx = ctx || document
  return ctx.querySelectorAll(selector)
}

function arrDiff(arr1, arr2) {
  return arr1.filter(function(el) {
    return arr2.indexOf(el) < 0
  })
}

function arrFindEquals(arr, el) {
  return arr.filter(function (_el) {
    return _el === el
  })
}

function inherit(parent) {
  function Child() {}
  Child.prototype = parent
  return new Child()
}

/*
 Virtual dom is an array of custom tags on the document.
 Updates and unmounts propagate downwards from parent to children.
*/

var virtualDom = [],
    tagImpl = {}


function getTag(dom) {
  return tagImpl[dom.getAttribute('riot-tag') || dom.tagName.toLowerCase()]
}

function injectStyle(css) {
  var node = document.createElement('style')
  node.innerHTML = css
  document.head.appendChild(node)
}

function mountTo(root, tagName, opts) {
  var tag = tagImpl[tagName],
      innerHTML = root.innerHTML

  // clear the inner html
  root.innerHTML = ''

  if (tag && root) tag = new Tag(tag, { root: root, opts: opts }, innerHTML)

  if (tag && tag.mount) {
    tag.mount()
    virtualDom.push(tag)
    return tag.on('unmount', function() {
      virtualDom.splice(virtualDom.indexOf(tag), 1)
    })
  }

}

riot.tag = function(name, html, css, fn) {
  if (typeof css == 'function') fn = css
  else if (css) injectStyle(css)
  tagImpl[name] = { name: name, tmpl: html, fn: fn }
  return name
}

riot.mount = function(selector, tagName, opts) {

  var el,
      selctAllTags = function(sel) {
        sel = Object.keys(tagImpl).join(', ')
        sel.split(',').map(function(t) {
          sel += ', *[riot-tag="'+ t.trim() + '"]'
        })
        return sel
      },
      tags = []

  if (typeof tagName == 'object') { opts = tagName; tagName = 0 }

  // crawl the DOM to find the tag
  if(typeof selector == 'string') {
    if (selector == '*') {
      // select all the tags registered
      // and also the tags found with the riot-tag attribute set
      selector = selctAllTags(selector)
    }
    // or just the ones named like the selector
    el = $$(selector)
  }
  // probably you have passed already a tag or a NodeList
  else
    el = selector

  // select all the registered and mount them inside their root elements
  if (tagName == '*') {
    // get all custom tags
    tagName = selctAllTags(selector)
    // if the root el it's just a single tag
    if (el.tagName) {
      el = $$(tagName, el)
    } else {
      var nodeList = []
      // select all the children for all the different root elements
      each(el, function(tag) {
        nodeList = $$(tagName, tag)
      })
      el = nodeList
    }
    // get rid of the tagName
    tagName = 0
  }

  function push(root) {
    var name = tagName || root.getAttribute('riot-tag') || root.tagName.toLowerCase(),
        tag = mountTo(root, name, opts)

    if (tag) tags.push(tag)
  }

  // DOM node
  if (el.tagName)
    push(selector)
  // selector or NodeList
  else
    each(el, push)

  return tags

}

// update everything
riot.update = function() {
  return each(virtualDom, function(tag) {
    tag.update()
  })
}

// @deprecated
riot.mountTo = riot.mount



  // share methods for other riot parts, e.g. compiler
  riot.util = { brackets: brackets, tmpl: tmpl }

  // support CommonJS, AMD & browser
  if (typeof exports === 'object')
    module.exports = riot
  else if (typeof define === 'function' && define.amd)
    define(function() { return riot })
  else
    window.riot = riot

})(typeof window != 'undefined' ? window : undefined);

},{}]},{},[1]);
