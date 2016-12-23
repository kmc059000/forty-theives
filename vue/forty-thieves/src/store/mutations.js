import _ from 'lodash'
import * as helpers from './helpers'

export const resetUndos = state => {
  state.undoCount = 0
}

export const incrementScore = state => {
  state.score++
}

export const deal = (state) => {
  var deck, i, j, stack

  deck = generateDeck()

  state.logOn = false

  state.playStacks = []
  for (i = 0; i < 10; i++) {
    stack = []

    state.playStacks.push(stack)

    for (j = 0; j < 4; j++) {
      helpers.pushCard(stack, deck.pop())
    }
  }

  state.discardStack = []
  state.drawStack = []

  while (deck.length > 0) {
    helpers.pushCard(state.drawStack, deck.pop())
  }

  state.dropStacks = []
  for (i = 0; i < 8; i++) {
    state.dropStacks.push([])
  }

  state.logOn = true
  state.score = 0
  state.startTime = new Date()
}

const consts = {
  cardNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  cardSuits: ['C', 'D', 'S', 'H'],
  decks: 2
}

function generateDeck () {
  var deck = []

  _.forEach(_.range(consts.decks), () => {
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

export const deselect = function (state) {
  if (state.selectedCard) {
    state.selectedCard.selected = false
  }

  state.selectedCard = null
  state.selectedStack = null
}

export const drawCard = function (state) {
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
