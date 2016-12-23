import * as helpers from './helpers'

export const anyCardsInDrawStack = state => {
  return state.drawStack.anyCards()
}

// Discard Stack
export const discardStackTopCard = state => {
  return helpers.topCard(state.discardStack)
}

export const discardStackAnyCards = state => {
  return helpers.anyCards(state.discardStack)
}

// Draw Stack
export const drawStackTopCard = state => {
  return helpers.topCard(state.drawStack)
}

export const drawStackAnyCards = state => {
  return helpers.anyCards(state.drawStack)
}
