import _ from 'lodash'

export const topCard = stack => {
  if (stack.length) {
    return stack[stack.length - 1]
  }
}

export const anyCards = stack => {
  return !!stack.length
}

export const pushCard = (stack, card) => {
  stack.push(card)
}

export const popCard = (stack) => {
  if (stack.length) {
    return stack.pop()
  }
}

export const canDropOnOpenCard = (sourceCard, card) => {
  return sourceCard.cardNumber - card.cardNumber === 1 && sourceCard.cardSuit === card.cardSuit
}

export const canDropOnDropStackCard = (sourceCard, card) => {
  if (!card) {
    return sourceCard.cardNumber === 1
  }

  return sourceCard.cardNumber - card.cardNumber === 1 && sourceCard.cardSuit === card.cardSuit
}

export function generateDeck () {
  const consts = {
    cardNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    cardSuits: ['C', 'D', 'S', 'H']
  }

  var deck = []

  _.forEach(_.range(2), () => {
    _.forEach(consts.cardNumbers, (cardNumber) => {
      _.forEach(consts.cardSuits, (cardSuit) => {
        deck.push({
          cardNumber,
          cardSuit,
          selected: false
        })
      })
    })
  })

  // one shuffle didnt seem all that random. Similar cards seemed to be right next to each other
  deck = _(deck).shuffle().shuffle().shuffle().value()

  return deck
}
