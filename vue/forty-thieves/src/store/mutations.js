import _ from 'lodash'
import * as helpers from './helpers'

export const resetUndos = state => {
  state.undoCount = 0
}

export const incrementScore = state => {
  state.score++
}

export const deal = (state) => {
  state.playStacks = _.map(_.range(10), i => [])
  state.dropStacks = _.map(_.range(8), i => [])
  state.discardStack = []
  state.drawStack = []
  state.score = 0
  state.startTime = new Date()

  var deck = helpers.generateDeck()

  // each play stack gets 4 cards
  var count = state.playStacks.length * 4
  while (count--) {
    state.playStacks[count % 10].push(deck.pop())
  }

  while (deck.length > 0) {
    state.drawStack.push(deck.pop())
  }
}

export const deselect = function (state) {
  if (state.selectedCard) {
    state.selectedCard.selected = false
  }

  state.selectedCard = null
  state.selectedStack = null
}

export const drawCard = function (state) {
  storeState(state)

  deselect(state)
  var card = helpers.popCard(state.drawStack)

  if (card) {
    helpers.pushCard(state.discardStack, card)
    state.score++
  }
}

export const selectDiscardStack = function (state) {
  var card = helpers.topCard(state.discardStack)

  if (card) {
    if (card === state.selectedCard) {
      deselect(state)
    } else {
      if (state.selectedCard) {
        deselect(state)
      }

      card.selected = true
      state.selectedCard = card
      state.selectedStack = state.discardStack
    }
  }
}

export const selectPlayStack = function (state, playStackIndex) {
  var playStack = state.playStacks[playStackIndex]
  var card = helpers.topCard(playStack)

  var previousCard = state.selectedCard

  if (card) {
    if (card === previousCard) {
      deselect(state)
    } else {
      if (previousCard && helpers.canDropOnOpenCard(card, previousCard)) {
        move(state, previousCard, playStack)
      } else {
        selectCard(state, card, playStack)
      }
    }
  }
}

export const selectDropStack = function (state, dropStackIndex) {
  var dropStack = state.dropStacks[dropStackIndex]
  var card = helpers.topCard(dropStack)

  var previousCard = state.selectedCard

  if (previousCard) {
    if (card === previousCard) {
      deselect(state)
    } else {
      if (previousCard && helpers.canDropOnDropStackCard(previousCard, card)) {
        move(state, previousCard, dropStack)
      } else {
        selectCard(state, card, dropStack)
      }
    }
  }
}

function move (state, card, newStack) {
  storeState(state)

  helpers.popCard(state.selectedStack)
  helpers.pushCard(newStack, card)

  deselect(state)
}

function selectCard (state, card, stack) {
  deselect(state)

  if (card) {
    card.selected = true
    state.selectedCard = card
    state.selectedStack = stack
  }
}

function storeState (state) {
  var copyableState = _.omit(state, ['history'])
  var clone = _.cloneDeep(copyableState)
  state.history.push(clone)
}

export function undo (state) {
  var newState = state.history.pop()
  _.assign(state, newState)

  deselect(state)
}
