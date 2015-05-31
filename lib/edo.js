/**
 * Edo
 */

function edo(listenTo, direction) {
  return function*(route = {}) {
    var deferred = new Deferred()
    var g = direction(route.path || '', route.query || {}, route.param ||{})
    var firstOpts = g.next().value
    firstOpts.listeners = [{
      key: listenTo,
      callback: function(arg) {
        var v = g.next(arg).value
        if (!v) return
        deferred.resolve(v)
        deferred = new Deferred()
      }
    }]
    yield firstOpts
    while (true) yield deferred.promise
  }
}
