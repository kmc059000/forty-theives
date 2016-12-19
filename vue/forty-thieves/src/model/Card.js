export default class Card {
  constructor (cardNum, cardS) {
    this.cardNumber = cardNum
    this.cardSuit = cardS

    this.stack = null

    this.selected = false
  }

  canDropOnOpenCard (card) {
    return this.cardNumber - card.cardNumber === 1 && this.cardSuit === card.cardSuit
  }

  canDropOnDropStackCard (card) {
    if (!card) {
      return this.cardNumber === 1
    }

    return this.cardNumber - card.cardNumber === 1 && this.cardSuit === card.cardSuit
  }
}
