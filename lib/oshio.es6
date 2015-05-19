/**
 * Oshio
 */

class Deferred {

  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this._resolve = resolve
      this._reject = reject
    })
  }

  resolve(value) { this._resolve(value) }
  reject(reason) { this._reject(reason) }

}

class Oshio {

  push(value) {
    this.deferred.resolve(value)
    this.deferred = new Deferred()
  }

  error(reason) {
    this.deferred.reject(reason)
    this.deferred = new Deferred()
  }

  *start() {
    this.deferred = new Deferred()
    while (true) yield this.deferred.promise
  }

  stop(opts = {}){
    this.resolve(opts)
  }

  on(key, callback) {
    this.resolve({
      listeners: [
        { key, callback }
      ]
    })
  }

}

export { Deferred, Oshio as default }
