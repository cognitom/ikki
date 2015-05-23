/**
 * Kyoto
 */

import Deferred from './deferred.es'

function kyoto(main, listeners) {
  var deferred
  var listenersArr = []
  var first = true

  function push(opts) {
    if (first) {
      opts.listeners = listenersArr
      first = false
    }
    deferred.resolve(opts)
    deferred = new Deferred()
  }

  Object.keys(listeners).map(function(key) {
    listenersArr.push({ key: key, callback: listeners[key].bind(this, push) })
  })

  return function*(route = {}) {
    deferred = new Deferred()
    setTimeout(() => {
      main(push, route.path || '', route.query || {}, route.param ||{})
      if (first) push({})
    }, 0)
    do {
      yield deferred.promise
    } while (true)
  }
}

export default kyoto
