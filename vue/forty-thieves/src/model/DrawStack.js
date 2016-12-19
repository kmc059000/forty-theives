export default class DrawStack {
  constructor (discardStack) {
    this._stack = []
    this._discardStack = discardStack
    this.selected = false
  }

  pushCard (card) {
    this._stack.push(card)
    card.stack = this
  }

  anyCards () {
    return !!this._stack.length
  }

  select () {
    this.selected = !this.selected
  }

  draw () {
    if (this._stack.length) {
      return this._stack.pop()
    }
  }
}
