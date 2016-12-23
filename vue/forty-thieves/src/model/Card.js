export default class Card {
  constructor (cardNum, cardS) {
    this.cardNumber = cardNum
    this.cardSuit = cardS

    this.stack = null

    this.selected = false
  }
}
