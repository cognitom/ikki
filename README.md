# ikki

An extention toolkit for [Riot.js](https://muut.com/riotjs/).

## Features

- passing promises/generators to the components instead of simple values
- routing inside the html w/o JavaScript
- simple controller class (not yet)

## Getting started

To use ikki, Riot v2.1.0 or above is needed.

### 1) via script tag

```html
<script src="//cdn.jsdelivr.net/riot/2.0/riot.js"></script>
<script src="dist/ikki.min.js"></script>
```

### 2) via Browserify

```bash
$ npm install --save ikki
```

```javascript
var riot = require('riot')
require('ikki')
```

## Guide

### opts attribute

ikki provides `opts` attribute to the component via mixin. It makes possible to:
  - Pass objects to the component
  - Pass **promise** to the component
  - Pass **generators** to the component

Without ikki we used to write like this:

```html
<my-tag message="Hi!" />
```

With ikki we can write this:

```html
<my-tag opts={ object } />
<script>
  this.object = { message: 'Hi!' }
</script>
```

Also it's OK to pass the promise.

```html
<my-tag opts={ promise } />
<script>
  this.promise = new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve({ message: 'Hello!' })
    }, 10000)
  })
</script>
```

And genrators, too. Now that, we can separate views and controllers easily.

```html
<my-tag opts={ generator } />
<script>
  this.generator = function*() { while (true) {
    yield new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve({ message: hello() })
      }, 1000)
    })
  }}
</script>
```

### HTML router

The easiest way to write the routing of your Riot applications. No need to write JavaScript.

#### Patterns

```html
<router>
  <route path="/"><my-tag message="hello world" /></route>
  <route path="lorem"><my-tag message="Lorem Ipsum is..." /></route>
  <route path="member/:person"><my-tag message="$person" /></route>
  <route path="*"><my-tag message="not found." /></route>
</router>
```

- `/`: slash(/) matchs url without hash
- `abc`: matchs exact 'abc'
- `aaa/bbb/ccc`: matchs exact 'aaa/bbb/ccc'
- `aaa/:xxx`: matchs anything starting with 'aaa/' and you can get the value of `:xxx` by `$xxx`
- `*`: matchs any url

#### Redirects

```html
<route path="old/url" redirect="new/url" />
<route path="google" redirect="https://www.google.com" />
```

- If redirect attribute is set, url will change to it
- CAUTION: don't make the infinite loop of redirect

#### Queries and parameters

routing | actual | queries | parameters | how to get
:--- | :--- | :--- | :--- | :--
`user/:id` | http://localhost/#user/111 | `{}` | `{ id: 'tom' }` | `$tom`
`search` | http://localhost/#search?word=ikki | `{ word: 'ikki' }` | `{}` | `?word`


## License

MIT
