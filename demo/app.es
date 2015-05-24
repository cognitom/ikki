var regeneratorRuntime = require('regenerator/runtime');riot.tag('app-section1', '<h2>pass a promise/generator, just like an object</h2> <h3>1. objects</h3> <p>At the first, see the traditional way to give the value.</p> <highlight> &lt;my-tag message="Hi!" /&gt;<br> </highlight> <p>Then, see the ikki\'s way. You can give the data as an object.<br>Great, but boring? OK, go ahead.</p> <highlight> &lt;my-tag opts=\\{ object } /&gt;<br> &lt;script&gt;<br> &nbsp;&nbsp;this.object = \\{ message: \'Hi!\' }<br> &lt;/script&gt; </highlight> <my-tag opts="{ obj }"></my-tag> <h3>2. functions</h3> <p>If you pass the function, the component will get the result of the function. It\'s useful when you want to handle the routing information or do something each time.</p> <highlight> &lt;my-tag opts=\\{ func } /&gt;<br> &lt;script&gt;<br> &nbsp;&nbsp;this.func = function(route) \\{<br> &nbsp;&nbsp;&nbsp;&nbsp;return \\{ message: "It\'s " + now + "." }<br> &nbsp;&nbsp;}<br> &lt;/script&gt; </highlight> <my-tag opts="{ func }"></my-tag> <h3>3. promises</h3> <p>We can give a promise to the tag. It\'ll make really easy to do any async process.</p> <highlight> &lt;my-tag opts=\\{ promise } /&gt;<br> &lt;script&gt;<br> &nbsp;&nbsp;this.promise = new Promise(function(resolve, reject) \\{<br> &nbsp;&nbsp;&nbsp;&nbsp;setTimeout(function() \\{<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;resolve(\\{ message: \'Hello!\' })<br> &nbsp;&nbsp;&nbsp;&nbsp;}, 10000)<br> &nbsp;&nbsp;})<br> &lt;/script&gt; </highlight> <my-tag opts="{ prom }"></my-tag> <h3>4. generators</h3> <p>The last stuff is the generator. Think it as serial promises.<br>That\'s awesome!</p> <highlight> &lt;my-tag opts=\\{ generator } /&gt;<br> &lt;script&gt;<br> &nbsp;&nbsp;this.generator = function*() \\{ while (true) \\{<br> &nbsp;&nbsp;&nbsp;&nbsp;yield new Promise(function(resolve, reject) \\{<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;setTimeout(function() \\{<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;resolve(\\{ message: hello())<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}, 1000)<br> &nbsp;&nbsp;&nbsp;&nbsp;})<br> &nbsp;&nbsp;}}<br> &lt;/script&gt; </highlight> <my-tag opts="{ gen }"></my-tag>', function(opts) {
    this.obj = { message: 'Hi!', desc: 'This is just an object.' }

    this.func = (route) => {
      let d = new Date()
      let h = d.getHours()
      let m = d.getMinutes()
      let now = h % 12 + (m < 10 ? ':0' : ':') + m + (h < 12 ? 'am' : 'pm')
      return { message: "It's "+ now + ".", desc: 'This is a function.' }
    }

    this.prom = new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve({ message: 'Hello!', desc: 'You can give a promise.' })
      }, 10000)
    })

    this.gen = function*() {
      var hello = pick(HELLO_I18N)
      while (true) {
        yield new Promise(function(resolve, reject) {
          setTimeout(function() {
            resolve({ message: hello(), desc: 'Generator is awesome!' })
          }, 1000)
        })
      }
    }

    var HELLO_I18N = ['Hello', 'こんにちは', '你好', 'Salut', 'Hallo']
    var pick = function(arr) { var n = -1; return function(){
      return arr[n = (n + Math.ceil(Math.random() * (arr.length - 1))) % arr.length]
    }}

  
});

riot.tag('app-section2', '<h2>routings in html</h2> <p>Nowaday, routing with the entire page is impractical.<br> The routing is needed to be more frexible.<br> You wanna change just the part of HTML instead of the entire page, doesn\'t you?<br> Here is what you wanted to do.</p> <h3>1. basic routings</h3> <highlight> &lt;router&gt;<br> &nbsp;&nbsp;&lt;route path="/"&gt;&lt;my-tag message="hello world" /&gt;&lt;/route&gt;<br> &nbsp;&nbsp;&lt;route path="lorem"&gt;&lt;my-tag message="Lorem Ipsum is..." /&gt;&lt;/route&gt;<br> &nbsp;&nbsp;&lt;route path="member/:person"&gt;&lt;my-tag message="$person" /&gt;&lt;/route&gt;<br> &nbsp;&nbsp;&lt;route path="merol" redirect="lorem" /&gt;<br> &nbsp;&nbsp;&lt;route path="*"&gt;&lt;my-tag message="not found." /&gt;&lt;/route&gt;<br> &lt;/router&gt;<br> </highlight> <navi> <ul> <li><a href="#lorem">#lorem</a></li> <li><a href="#member/Tom">#member/Tom</a></li> <li><a href="#merol">#merol</a></li> <li><a href="#not/found">#not/found</a></li> </ul> </navi> <router> <route path="/"><my-tag message="hello world" desc="slash(/) matchs url without hash"></my-tag></route> <route path="lorem"><my-tag message="Lorem Ipsum is simply dummy text of the printing and typesetting industry." desc="\'lorem\' matchs exact \'lorem\'"></my-tag></route> <route path="member/:person"><my-tag message="$person" desc="\'member/:person\' matchs anything starting with \'member/\'"></my-tag></route> <route path="merol" redirect="lorem"></route> <route path="*"><my-tag message="not found." desc="asterisk(*) matchs any url"></my-tag></route> </router> <h3>2. pass the routing info to functions/generators</h3> <p>Of cause, the routing info can be passed to functions/generators via the argument.</p> <highlight> &lt;router&gt;<br> &nbsp;&nbsp;&lt;route path="hour/:hour"&gt;&lt;my-tag opts=\\{ generator } /&gt;&lt;/route&gt;<br> &lt;/router&gt;<br> &lt;script&gt;<br> &nbsp;&nbsp;this.generator = function*(route) \\{<br> &nbsp;&nbsp;&nbsp;&nbsp;// route.path: hour/10<br> &nbsp;&nbsp;&nbsp;&nbsp;// route.query: \\{}<br> &nbsp;&nbsp;&nbsp;&nbsp;// route.param: \\{ hour: 10 }<br> &nbsp;&nbsp;}<br> &lt;/script&gt; </highlight> <p>Click the links below to try it.</p> <navi> <ol> <li> <a href="#hour/10">#hour/10</a> <span each="{ msg, i in greeting.morning }">{ msg }</span> </li> <li> <a href="#hour/14">#hour/14</a> <span each="{ msg, i in greeting.hello }">{ msg }</span> </li> <li> <a href="#hour/18">#hour/18</a> <span each="{ msg, i in greeting.evening }">{ msg }</span> </li> </ol> </navi> <router> <route path="hour/:hour"><my-tag opts="{ parent.parent.gen3 }"></my-tag></route> <route path="*"><my-tag message="Click the links above." desc="..."></my-tag></route> </router>', 'app-section2 navi ol , [riot-tag="app-section2"] navi ol { border: 1px solid #a7b5c1; border-radius: .3em; margin: 1em 3em; padding: 0; color: #a7b5c1; } app-section2 navi ol li , [riot-tag="app-section2"] navi ol li { display: block; border-top: 1px solid #a7b5c1; padding: .2em 0 .2em 1em; text-align: left; overflow: hidden; white-space: nowrap; } app-section2 navi ol li:first-child , [riot-tag="app-section2"] navi ol li:first-child { border-top: none; } app-section2 navi ol li a , [riot-tag="app-section2"] navi ol li a { margin-right: .2em; padding-right: .4em; border-right: 1px dotted #a7b5c1; } app-section2 navi ol li span , [riot-tag="app-section2"] navi ol li span { background-color: #a7b5c1; color: white; border-radius: .3em; padding: .1em .3em; margin: 0 .1em; font-size: 80%; }', function(opts) {
    var Deferred = require('../').Deferred
    var GREETING = {
      morning: ['Good morning', 'おはよう', '早上好', 'Bonjour', 'Buon giorno'],
      hello: ['Hello', 'こんにちは', '你好', 'Salut', 'Ciao'],
      evening: ['Good evening', 'こんばんは', '晩上好', 'Bonsoir', 'Buona sera']
    }

    this.greeting = GREETING

    this.gen3 = function*(route) {
      var hour = route && route.param ? (route.param.hour || 12) % 24 : 12
      var w = hour < 12 ? 'morning' : hour < 17 ? 'hello' : 'evening'
      var n = 0

      yield { message: "It's " + hour + " o'clock." } // quickly yield at first
      while (true) {
        yield new Promise(function(resolve, reject) {
          setTimeout(function() {
            resolve({
              message: GREETING[w][n],
              desc: 'You can pass the routing info to the generator.'
            })
            n = (n + 1) % GREETING[w].length
          }, 1500)
        })
      }
    }

  
});

riot.tag('app-section3', '<h2>listen to events on components</h2> <p>In short, yield an array of listeners like this:</p> <highlight> var evts = [\\{<br> &nbsp;&nbsp;key: \'click\',<br> &nbsp;&nbsp;callback: function (e) \\{ /* do something cool */ }<br> }]<br> yield \\{ listeners: evts } </highlight> <p>Basically, ikki provide no way to communicate with component and controllers directly, for the sake of separation. But this `listeners` is only an exception.</p> <p>If you\'re familier with deferred concept, you can resolve the promise inside the listener.</p> <highlight> var deferred = new Deferred()<br> var evts = [\\{<br> &nbsp;&nbsp;key: \'click\',<br> &nbsp;&nbsp;callback: function (e) \\{ deferred.resolve(\\{ message: hello() }) }<br> }]<br> yield \\{ listeners: evts }<br> yield deferred.promise </highlight> <my-dialog opts="{ gen2 }"></my-dialog>', function(opts) {
    var Deferred = require('../').Deferred
    var HELLO = ['Hello', 'こんにちは', '你好', 'Salut', 'Hallo']

    this.gen2 = function*() {
      var deferred = new Deferred()
      var n = 0

      var evt = {
        key: 'click',
        callback: function(e) {
          deferred.resolve({ message: HELLO[n] })
          deferred = new Deferred()
          n = (n + 1) % HELLO.length
        }
      }

      yield { listeners: [evt] } // listen the event
      yield { message: 'Click me!', btns: ['Next'] } // quickly yield at first
      while (true) yield deferred.promise
    }

  
});

riot.tag('app-section4', '<h2>making generators with helpers</h3> <p>ikki has several built-in helpers. (named after Japanese historical cities)</p> <p>These helpers wrap generators and event subscriptions to handle them with ease.</p> <h3>1. Kyoto</h3> <p><code>Kyoto</code> takes event-driven approach. And you don\'t have to care about the generator which is relatively new in JavaScript.</p> <highlight> var kyoto = require(\'ikki/lib/kyoto.es\')<br> var HELLO = [\'Hello\', \'こんにちは\', \'你好\', \'Salut\', \'Hallo\']<br> <br> this.hello = kyoto(function(push, path, query, param) {<br> &nbsp;&nbsp;push(\\{ message: \'Click me!\', btns: [\'Next\'] })<br> }, {<br> &nbsp;&nbsp;\'click\': (push, data) => \\{<br> &nbsp;&nbsp;&nbsp;&nbsp;push(\\{ message: HELLO[n = ++n % HELLO.length] + \'!\' })<br> &nbsp;&nbsp;}<br> }) </highlight> <my-dialog opts="{ hello }"></my-dialog> <h3>2. Edo</h3> <p>On the other hand, <code>edo</code> is the generator based flow-controler. If you need serial/branching interactions with user\'s input, this will be a perfect solution.</p> <highlight> var edo = require(\'ikki/lib/edo.es\')<br> <br> this.dialog = edo(\'click\', function* direction(path, query, param) \\{<br> &nbsp;&nbsp;yield \\{ message: \'Good morning!\', btns: [\'Hi\'] }<br> &nbsp;&nbsp;let fruit = yield \\{ message: \'Which do you like?\', btns: [\'apple\', \'banana\'] }<br> &nbsp;&nbsp;yield \\{ message: "OK, I\'ll give you this " + fruit + \'.\', btns: [\'Thanks\'] }<br> &nbsp;&nbsp;yield \\{ message: \'See you!\', btns: [\'Bye\'] }<br> }) </highlight> <my-dialog opts="{ dialog }"></my-dialog>', function(opts) {
    var ikki = require('../')
    var edo = ikki.edo
    var kyoto = ikki.kyoto
    var HELLO = ['Hello', 'こんにちは', '你好', 'Salut', 'Hallo']

    var n = -1
    this.hello = kyoto(function(push, path, query, param) {
      push({ message: 'Click me!', btns: ['Next'] })
    }, {
      'click': (push, data) => {
        push({ message: HELLO[n = ++n % HELLO.length] + '!' })
      }
    })

    this.dialog = edo('click', function* direction(path, query, param) {
      while (true) {
        yield { message: 'Good morning!', btns: ['Hi'] }
        let fruit = yield { message: 'Which do you like?', btns: ['apple', 'banana'] }
        yield { message: "OK, I'll give you this " + fruit + '.', btns: ['Thanks'] }
        yield { message: 'See you!', btns: ['Bye'] }
      }
    })

  
});

riot.tag('app', '<header> <h1>ikki</h1> <p>ikki is not flux</p> </header> <section class="billboard"> <h2>deadly simple &amp; html-centric</h2> <p>The extention toolkit for <a href="https://muut.com/riotjs/">Riot.js</a></p> <img src="demo/one-way.png"> <img src="demo/routing.png"> </section> <section riot-tag="app-section1"></section> <section riot-tag="app-section2"></section> <section riot-tag="app-section3"></section> <section riot-tag="app-section4"></section> <footer> <p><a href="https://github.com/cognitom/ikki">GitHub</a></p> </footer>', 'app , [riot-tag="app"] { display: block; text-align: center; } app > header , [riot-tag="app"] > header { padding: 8em 0; background: #8A97A1; color: white; text-shadow: 0 0 2px rgba(0,0,0,.5); } app > header h1 , [riot-tag="app"] > header h1 { margin: 0; font-size: 340%; } app > header p , [riot-tag="app"] > header p { margin: 0; } app section > p , [riot-tag="app"] section > p { line-height: 1.4em; padding: 0 .5em; } app section > h2 , [riot-tag="app"] section > h2 { margin: 3em 0 .5em; color: #8A97A1; } app section > h3 , [riot-tag="app"] section > h3 { margin: 3em 0 .5em; } app > footer , [riot-tag="app"] > footer { border-top: 1px solid #ccc; margin: 3em 0 0; padding: 2em 0; background: #f7f7f7; } app navi ul , [riot-tag="app"] navi ul { list-style: none; padding: .5em; } app navi ul li , [riot-tag="app"] navi ul li { display: inline-block; } app navi ul li:after , [riot-tag="app"] navi ul li:after { content: "-"; margin: 0 1em; } app navi ul li:last-child:after , [riot-tag="app"] navi ul li:last-child:after { content: none; } app navi a , [riot-tag="app"] navi a { } app a , [riot-tag="app"] a { color: #2887D7; text-decoration: none; } app .billboard , [riot-tag="app"] .billboard { background: #ffd700; color: #8A97A1; padding: 2em; } app .billboard > h2 , [riot-tag="app"] .billboard > h2 { margin: 1em .5em .5em; } app .billboard a , [riot-tag="app"] .billboard a { color: inherit; font-weight: bold; }', function(opts) {


});

riot.tag('highlight', '<yield></yield>', 'highlight , [riot-tag="highlight"] { display: block; font-family: monospace; border-top: 1px solid #ddd; border-bottom: 1px solid #ddd; padding: 1em 8% !important; text-align: left; }', function(opts) {
    this.on('mount', function() {
      hljs.highlightBlock(this.root)
    })
  
});

riot.tag('my-dialog', '<p>{ opts.message || \'Well...\' }</p> <footer> <button each="{ name, i in opts.btns }" onclick="{ parent.click }">{ name }</button> </footer>', 'my-dialog , [riot-tag="my-dialog"] { display: block; border: 1px solid #a7b5c1; border-radius: .3em; margin: 1em 3em; background: #a7b5c1; color: white; } my-dialog p , [riot-tag="my-dialog"] p { line-height: 1.2em; margin: 0; padding: .8em; font-size: 150%; } my-dialog footer , [riot-tag="my-dialog"] footer { font-size: 90%; color: #a7b5c1; padding: .8em; background: #fff; border-bottom-left-radius: .3em; border-bottom-right-radius: .3em; } my-dialog button , [riot-tag="my-dialog"] button { margin: 0 .2em }', function(opts) {
    this.mixin('ikki')

    this.click = function(e) {
      this.trigger('click', e.item.name)
    }.bind(this);
  
});

riot.tag('my-tag', '<p onclick="{ click }">{ opts.message || \'Well...\' }</p> <footer>{ opts.desc || \'Loading...\' }</footer>', 'my-tag , [riot-tag="my-tag"] { display: block; border: 1px solid #a7b5c1; border-radius: .3em; margin: 1em 3em; background: #a7b5c1; color: white; } my-tag p , [riot-tag="my-tag"] p { line-height: 1.2em; margin: 0; padding: .8em; font-size: 150%; } my-tag footer , [riot-tag="my-tag"] footer { font-size: 90%; color: #a7b5c1; padding: .8em; background: #fff; border-bottom-left-radius: .3em; border-bottom-right-radius: .3em; }', function(opts) {
    this.mixin('ikki')

    this.click = function(e) {
      this.trigger('click', e)
    }.bind(this);
  
});
