export default class DiscardStack {
  constructor (index) {
    this._stack = []
  }

  popCard (card) {
    return this._stack.pop()
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
