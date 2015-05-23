import Oshio from '../lib/Oshio.es'

const HELLO_I18N = ['Hello', 'こんにちは', '你好', 'Salut', 'Hallo']

class Hello extends Oshio {
  direction(path, query, param) {
    let n = -1

    this.on('click', () => {
      this.push({
        message: HELLO_I18N[n = ++n % HELLO_I18N.length] + '!',
        desc: 'Click to change the word.'
      })
    })

    this.push({ message: 'Click me!', desc: '...' })
  }
}

export default Hello
