import _ from 'lodash'
import Card from '../model/Card'
import PlayStack from '../model/PlayStack'
import DiscardPile from '../model/DiscardPile'
import DrawPile from '../model/DrawPile'
import DropZone from '../model/DropZone'

export const increment = state => {
  state.count++
  state.history.push('increment')
}

export const decrement = state => {
  state.count--
  state.history.push('decrement')
}

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

  state.discardPile = new DiscardPile()
  state.drawPile = new DrawPile(state.discardPile)

  while (deck.length > 0) {
    state.drawPile.pushCard(deck.pop())
  }

  for (i = 0; i < 8; i++) {
    stack = new DropZone(i)
    state.dropZones.push(stack)
  }

  // $("#left, #right").click(deselectSelected)

  state.logOn = true
  state.score = 0
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

export const deselectAll = function (state) {

}

export const selectDrawPile = function (state) {
  deselectAll()
  state.drawPile.select()
}

export const drawCard = function (state) {
  deselectAll()

  var card = state.drawPile.draw()

  if (card) {
    state.discardPile.push(card)
    state.score++
  }
}
