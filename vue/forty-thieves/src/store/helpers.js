
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
