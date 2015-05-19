import Oshio from '../lib/Oshio.es'

var HELLO_I18N = ['Hello', 'こんにちは', '你好', 'Salut', 'Hallo']

class Hello extends Oshio {

  direction(path, query, param) {
    let name  = param.person || 'world'
    let hello = randomPick(HELLO_I18N)

    let pack  = (str) => { return {
      message: hello() + ' ' + str + '!',
      desc: 'Hmmmmm.'
    }}

    this.on('click', () => { this.push(pack(name)) })
    this.push(pack(name))
  }

}

function randomPick(arr) {
  let n = -1
  return function(){
    n = (n + Math.ceil(Math.random() * (arr.length - 1))) % arr.length
    return arr[n]
  }
}

export default Hello
