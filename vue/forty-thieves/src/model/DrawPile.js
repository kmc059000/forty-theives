export default class DrawPile {
  constructor (discardPile) {
    this._stack = []
    this._discardPile = discardPile
    this.selected = false
  }

  pushCard (card) {
    this._stack.push(card)
    card.pile = this
  }

  anyCards () {
    return !!this._stack.length
  }

  select () {
    this.selected = !this.selected
  }
}
