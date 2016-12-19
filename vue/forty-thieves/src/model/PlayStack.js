export default class PlayStack {
  constructor (index) {
    this._stack = []
  }

  popCard (card) {
    return this._stack.pop()
  }

  pushCard (card) {
    this._stack.push(card)
    card.stack = this
  }

  anyCards () {
    return !!this._stack.length
  }

  cards () {
    return this._stack
  }

  topCard () {
    if (this._stack.length) {
      return this._stack[this._stack.length - 1]
    }
  }
}
