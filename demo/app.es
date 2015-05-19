var regeneratorRuntime = require('regenerator/runtime');riot.tag('app', '<header> <h1>ikki</h1> <p>ikki is not flux</p> </header> <section class="billboard"> <h2>deadly simple &amp; html-centric</h2> <p>The extention toolkit for <a href="https://muut.com/riotjs/">Riot.js</a></p> <img src="demo/one-way.png"> <img src="demo/routing.png"> </section> <h2>pass a promise/generator, just like an object</h2> <h3>1. object</h3> <p>At the first, see the traditional way to give the value.</p> <highlight> &lt;my-tag message="Hi!" /&gt;<br> </highlight> <p>Then, see the ikki\'s way. You can give the data as an object.<br>Great, but boring? OK, go ahead.</p> <highlight> &lt;my-tag opts=\\{ object } /&gt;<br> &lt;script&gt;<br> &nbsp;&nbsp;this.object = \\{ message: \'Hi!\' }<br> &lt;/script&gt; </highlight> <my-tag opts="{ obj }"></my-tag> <h3>2. promise</h3> <p>We can give a promise to the tag. It\'ll make really easy to do any async process.</p> <highlight> &lt;my-tag opts=\\{ promise } /&gt;<br> &lt;script&gt;<br> &nbsp;&nbsp;this.promise = new Promise(function(resolve, reject) \\{<br> &nbsp;&nbsp;&nbsp;&nbsp;setTimeout(function() \\{<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;resolve(\\{ message: \'Hello!\' })<br> &nbsp;&nbsp;&nbsp;&nbsp;}, 10000)<br> &nbsp;&nbsp;})<br> &lt;/script&gt; </highlight> <my-tag opts="{ prom }"></my-tag> <h3>3. generator</h3> <p>The third stuff is the generator. Think it as serial promises.<br>That\'s awesome!</p> <highlight> &lt;my-tag opts=\\{ generator } /&gt;<br> &lt;script&gt;<br> &nbsp;&nbsp;this.generator = function*() \\{ while (true) \\{<br> &nbsp;&nbsp;&nbsp;&nbsp;yield new Promise(function(resolve, reject) \\{<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;setTimeout(function() \\{<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;resolve(\\{ message: hello())<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}, 1000)<br> &nbsp;&nbsp;&nbsp;&nbsp;})<br> &nbsp;&nbsp;}}<br> &lt;/script&gt; </highlight> <my-tag opts="{ gen }"></my-tag> <h2>routings in html</h2> <p>The routing is needed to be more frexible.<br> Nowaday, routing with the entire page is impractical.<br> You may wanna change just the part of HTML instead of the entire page.<br> Here is what we wanted to do.</p> <highlight> &lt;router&gt;<br> &nbsp;&nbsp;&lt;route path="/"&gt;&lt;my-tag message="hello world" /&gt;&lt;/route&gt;<br> &nbsp;&nbsp;&lt;route path="lorem"&gt;&lt;my-tag message="Lorem Ipsum is..." /&gt;&lt;/route&gt;<br> &nbsp;&nbsp;&lt;route path="member/:person"&gt;&lt;my-tag message="$person" /&gt;&lt;/route&gt;<br> &nbsp;&nbsp;&lt;route path="merol" redirect="lorem" /&gt;<br> &nbsp;&nbsp;&lt;route path="*"&gt;&lt;my-tag message="not found." /&gt;&lt;/route&gt;<br> &lt;/router&gt;<br> </highlight> <navi> <ul> <li><a href="#lorem">#lorem</a></li> <li><a href="#member/Tom">#member/Tom</a></li> <li><a href="#merol">#merol</a></li> <li><a href="#not/found">#not/found</a></li> </ul> </navi> <router> <route path="/"><my-tag message="hello world" desc="slash(/) matchs url without hash"></my-tag></route> <route path="lorem"><my-tag message="Lorem Ipsum is simply dummy text of the printing and typesetting industry." desc="\'lorem\' matchs exact \'lorem\'"></my-tag></route> <route path="member/:person"><my-tag message="$person" desc="\'member/:person\' matchs anything starting with \'member/\'"></my-tag></route> <route path="merol" redirect="lorem"></route> <route path="*"><my-tag message="not found." desc="asterisk(*) matchs any url"></my-tag></route> </router> <h2>controllers, kind of</h2> <h3>1. introduce event listeners</h3> <p>Yield an array of listeners like this:</p> <highlight> var evts = [\\{<br> &nbsp;&nbsp;key: \'click\',<br> &nbsp;&nbsp;callback: function (e) \\{ /* do something cool */ }<br> }]<br> yield \\{ listeners: evts } </highlight> <p>If you\'re familier with deferred concept, you can resolve the promise inside the listener.</p> <highlight> var deferred = new Deferred()<br> var evts = [\\{<br> &nbsp;&nbsp;key: \'click\',<br> &nbsp;&nbsp;callback: function (e) \\{ deferred.resolve(\\{ message: hello() }) }<br> }]<br> yield \\{ listeners: evts }<br> yield deferred.promise </highlight> <my-tag opts="{ gen2 }"></my-tag> <h3>2. combinations</h3> <p>OK, we have generators and routers. Then, combine them.</p> <navi> <ul> <li><a href="#member/Tom">#member/Tom</a></li> <li><a href="#member/Yayoi">#member/Yayoi</a></li> <li><a href="#member/John">#member/John</a></li> </ul> </navi> <router> <route path="member/:person"><my-tag opts="{ parent.parent.gen3 }"></my-tag></route> <route path="*"><my-tag message="not found." desc="Click the links above."></my-tag></route> </router> <h3>3. making controllers</h3> <p>Another example is <a href="https://github.com/cognitom/ikki/blob/dev/demo/hello.es">here</a>.</p> <router> <route path="member/:person"><my-tag opts="{ parent.parent.gen4 }"></my-tag></route> <route path="*"><my-tag message="not found." desc="Click the links above."></my-tag></route> </router> <footer> <p><a href="https://github.com/cognitom/ikki">GitHub</a></p> </footer>', 'app , [riot-tag="app"] { display: block; text-align: center; } app > header , [riot-tag="app"] > header { padding: 8em 0; background: #8A97A1; color: white; text-shadow: 0 0 2px rgba(0,0,0,.5); } app > header h1 , [riot-tag="app"] > header h1 { margin: 0; font-size: 340%; } app > header p , [riot-tag="app"] > header p { margin: 0; } app > p , [riot-tag="app"] > p { line-height: 1.4em; padding: 0 .5em; } app > h2 , [riot-tag="app"] > h2 { margin: 3em 0 .5em; color: #8A97A1; } app > h3 , [riot-tag="app"] > h3 { margin: 3em 0 .5em; } app > footer , [riot-tag="app"] > footer { border-top: 1px solid #ccc; margin: 3em 0 0; padding: 2em 0; background: #f7f7f7; } app > navi , [riot-tag="app"] > navi { } app > navi ul , [riot-tag="app"] > navi ul { list-style: none; padding: .5em; } app > navi li , [riot-tag="app"] > navi li { display: inline-block; } app > navi li:after , [riot-tag="app"] > navi li:after { content: "-"; margin: 0 1em; } app > navi li:last-child:after , [riot-tag="app"] > navi li:last-child:after { content: none; } app > navi a , [riot-tag="app"] > navi a { } app a , [riot-tag="app"] a { color: #2887D7; text-decoration: none; } app .billboard , [riot-tag="app"] .billboard { background: #ffd700; color: #8A97A1; padding: 2em; } app .billboard a , [riot-tag="app"] .billboard a { color: inherit; font-weight: bold; }', function(opts) {
    var Hello = require('./hello.es')

    this.obj = { message: 'Hi!', desc: 'This is just an object.' }

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

    this.gen2 = function*() {
      var hello = pick(HELLO_I18N)
      var resolve = null
      var deferred = new Deferred()

      function pack() { return {
        message: hello(),
        desc: 'Click to change the word.'
      }}

      var evt = {
        key: 'click',
        callback: function(e) {
          deferred.resolve(pack())
          deferred = new Deferred()
        }
      }

      yield { listeners: [evt] } // listen the event
      yield pack() // quickly yield at first
      while (true) yield deferred.promise
    }

    this.gen3 = function*(route) {
      var name = 'world'
      var hello = pick(HELLO_I18N)

      if (route && route.param) name = route.param.person || name

      function pack() { return {
        message: hello() + ' ' + name + '!',
        desc: 'You can pass the routing info to the generator.'
      }}

      yield pack() // quickly yield at first
      while (true) {
        yield new Promise(function(resolve, reject) {
          setTimeout(function() { resolve(pack()) }, 1000)
        })
      }
    }

    this.gen4 = new Hello().start()

    var HELLO_I18N = ['Hello', 'こんにちは', '你好', 'Salut', 'Hallo']
    var pick = function(arr) { var n = -1; return function(){
      return arr[n = (n + Math.ceil(Math.random() * (arr.length - 1))) % arr.length]
    }}
    function Deferred() {
      this.promise = new Promise(function(resolve, reject) {
        this._resolve = resolve
        this._reject = reject
      }.bind(this))
    }
    Deferred.prototype.resolve = function(value) { this._resolve(value) }
    Deferred.prototype.reject = function(reason) { this._reject(reason) }

  
});

riot.tag('highlight', '<yield></yield>', 'highlight , [riot-tag="highlight"] { display: block; font-family: monospace; border-top: 1px solid #ddd; border-bottom: 1px solid #ddd; padding: 1em 8% !important; text-align: left; }', function(opts) {
    this.on('mount', function() {
      hljs.highlightBlock(this.root)
    })
  
});

riot.tag('my-tag', '<p onclick="{ click }">{ opts.message || \'Well...\' }</p> <footer>{ opts.desc || \'Loading...\' }</footer>', 'my-tag , [riot-tag="my-tag"] { display: block; border: 1px solid #a7b5c1; border-radius: .3em; margin: 1em 3em; background: #a7b5c1; color: white; } my-tag p , [riot-tag="my-tag"] p { line-height: 1.2em; margin: 0; padding: .8em; font-size: 150%; } my-tag footer , [riot-tag="my-tag"] footer { font-size: 90%; color: #a7b5c1; padding: .8em; background: #fff; border-bottom-left-radius: .3em; border-bottom-right-radius: .3em; }', function(opts) {
    this.mixin('ikki')

    this.click = function(e) {
      this.trigger('click', e)
    }.bind(this);
  
});
