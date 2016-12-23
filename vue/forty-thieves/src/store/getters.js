import * as helpers from './helpers'

export const count = state => state.count

const limit = 5

export const recentHistory = state => {
  const end = state.history.length
  const begin = end - limit < 0 ? 0 : end - limit
  return state.history
    .slice(begin, end)
    .toString()
    .replace(/,/g, ', ')
}

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
