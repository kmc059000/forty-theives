import { assign, cloneDeep, omit, range } from 'lodash';
import * as helpers from './helpers';

export function deal(state) {
  state.playStacks = range(10).map(() => []);
  state.dropStacks = range(8).map(() => []);
  state.discardStack = [];
  state.drawStack = [];
  state.score = 0;
  state.startTime = new Date();

  const deck = helpers.generateDeck();

  // each play stack gets 4 cards
  let count = state.playStacks.length * 4;
  while (count) {
    state.playStacks[count % 10].push(deck.pop());
    count -= 1;
  }

  while (deck.length > 0) {
    state.drawStack.push(deck.pop());
  }
}

export function drawCard(state) {
  storeState(state);

  deselect(state);
  const card = helpers.popCard(state.drawStack);

  if (card) {
    helpers.pushCard(state.discardStack, card);
    state.score += 1;
  }
}

// SELECTING CARDS
export function selectDiscardStack(state) {
  const card = helpers.topCard(state.discardStack);

  if (card) {
    if (card === state.selectedCard) {
      deselect(state);
    } else {
      if (state.selectedCard) {
        deselect(state);
      }

      card.selected = true;
      state.selectedCard = card;
      state.selectedStack = state.discardStack;
    }
  }
}

export function selectPlayStack(state, playStackIndex) {
  const playStack = state.playStacks[playStackIndex];
  const card = helpers.topCard(playStack);

  const previousCard = state.selectedCard;

  if (card) {
    if (card === previousCard) {
      deselect(state);
    } else if (previousCard && helpers.canDropOnOpenCard(card, previousCard)) {
      move(state, previousCard, playStack);
    } else {
      selectCard(state, card, playStack);
    }
  }
}

export function selectDropStack(state, dropStackIndex) {
  const dropStack = state.dropStacks[dropStackIndex];
  const card = helpers.topCard(dropStack);

  const previousCard = state.selectedCard;

  if (previousCard) {
    if (card === previousCard) {
      deselect(state);
    } else if (previousCard && helpers.canDropOnDropStackCard(previousCard, card)) {
      move(state, previousCard, dropStack);
    } else {
      selectCard(state, card, dropStack);
    }
  }
}

function selectCard(state, card, stack) {
  deselect(state);

  if (card) {
    card.selected = true;
    state.selectedCard = card;
    state.selectedStack = stack;
  }
}

export function deselect(state) {
  if (state.selectedCard) {
    state.selectedCard.selected = false;
  }

  state.selectedCard = null;
  state.selectedStack = null;
}

// UNDO Handling
export function undo(state) {
  const newState = state.history.pop();
  assign(state, newState);

  deselect(state);
}

function storeState(state) {
  const copyableState = omit(state, ['history']);
  const clone = cloneDeep(copyableState);
  state.history.push(clone);
}

// MOVING CARDS
function move(state, card, newStack) {
  storeState(state);

  helpers.popCard(state.selectedStack);
  helpers.pushCard(newStack, card);

  deselect(state);
}

export function setSuitMode(state, mode) {
  state.twoSuits = mode === 2;
}

export function setCycleMode(state, mode) {
  state.cycleMode = !!mode;
}
