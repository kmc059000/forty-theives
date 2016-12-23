import _ from 'lodash'
import Card from '../model/Card'
import PlayStack from '../model/PlayStack'
import DiscardStack from '../model/DiscardStack'
import DrawStack from '../model/DrawStack'
import DropStack from '../model/DropStack'

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

  for (i = 0; i < 10; i++) {
    stack = new PlayStack(i)

    state.playStacks.push(stack)

    for (j = 0; j < 4; j++) {
      stack.pushCard(deck.pop())
    }
  }

  state.discardStack = new DiscardStack()
  state.drawStack = new DrawStack(state.discardStack)

  while (deck.length > 0) {
    state.drawStack.pushCard(deck.pop())
  }

  for (i = 0; i < 8; i++) {
    stack = new DropStack(i)
    state.dropStacks.push(stack)
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
        deck.push(new Card(cardNumber, cardSuit))
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
  var card = state.drawStack.draw()

  if (card) {
    state.discardStack.push(card)
    state.score++
  }
}

export const selectDiscardStack = function (state) {
  var card = state.discardStack.topCard()

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
  var card = playStack.topCard()

  var previousCard = state.selectedCard

  if (card) {
    if (card === previousCard) {
      deselect(state)
    } else {
      if (previousCard && card.canDropOnOpenCard(previousCard)) {
        move(state, previousCard, playStack)
      } else {
        selectCard(state, card, playStack)
      }
    }
  }
}

export const selectDropStack = function (state, dropStackIndex) {
  var dropStack = state.dropStacks[dropStackIndex]
  var card = dropStack.topCard()

  var previousCard = state.selectedCard

  if (previousCard) {
    if (card === previousCard) {
      deselect(state)
    } else {
      if (previousCard && previousCard.canDropOnDropStackCard(card)) {
        move(state, previousCard, dropStack)
      } else {
        selectCard(state, card, dropStack)
      }
    }
  }
}

function move (state, card, newStack) {
  state.selectedStack.popCard()

  newStack.pushCard(card)

  deselect(state)
}

function selectCard (state, card, stack) {
  deselect(state)

  card.selected = true
  state.selectedCard = card
  state.selectedStack = stack
}
