export default class Card {
  constructor (cardNum, cardS) {
    this.cardNumber = cardNum
    this.cardSuit = cardS

    this.pile = null
  }

  canDropOnOpenCard (card) {
    return this.cardNumber - card.cardNumber === 1 && this.cardSuit === card.cardSuit
  }

  canDropOnDropStackCard (card) {
    return this.cardNumber - card.cardNumber === -1 && this.cardSuit === card.cardSuit
  }
}
