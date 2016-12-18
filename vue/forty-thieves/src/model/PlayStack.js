export default class PlayStack {
  constructor (index) {
    this._stack = []
  }
  pushCard (card) {
    var stack = this._stack

    stack.push(card)
    card.pile = this
  }

  anyCards () {
    return !!this._stack.length
  }

  cards () {
    return this._stack
  }
}
