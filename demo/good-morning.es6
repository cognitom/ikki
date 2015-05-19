import Shimabara from '../lib/shimabara'

class GoodMorning extends Shimabara {

  *direction(path, query, param) {
    this.listen('click')

    yield { message: 'Good morning!', btns: ['Next'] }
    do {
      yield { message: 'Which do you like?', btns: ['Apple', 'Banana'] }
      if ('Apple' == this.$$)
        yield { message: "Me, too!", btns: ['Done'] }
      else if ('Orange' == this.$$)
        yield { message: "Oh no...", btns: ['Done'] }
    } while (true)
  }

}

export default GoodMorning
