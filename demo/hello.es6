import Oshio from '../lib/Oshio'

const HELLO_I18N = ['Hello', 'こんにちは', '你好', 'Salut', 'Hallo']

class Hello extends Oshio {

  constructor(route = {}) {
    let param = route.param || {}
    let name  = param.person || 'world'
    let hello = randomPick(HELLO_I18N)
    let pack  = str => hello() + ' ' + str + '!'

    super()

    this.on('click', () => { this.push(pack()) })
    this.push(pack())
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
