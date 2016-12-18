export default class DiscardPile {
  constructor (index) {
    this._stack = []
  }

  topCard () {
    if (this._stack.length) {
      return this._stack[this._stack.length - 1]
    }
  }

  anyCards () {
    return !!this._stack.length
  }

  select () {
    this.selected = !this.selected
  }

  push (card) {
    if (card) {
      this._stack.push(card)
    }
  }
}
