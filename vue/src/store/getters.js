import { anyCards, topCard } from './helpers';

export function anyCardsInDrawStack(state) {
  return anyCards(state.drawStack);
}

// Discard Stack
export function discardStackTopCard(state) {
  return topCard(state.discardStack);
}

export function discardStackAnyCards(state) {
  return anyCards(state.discardStack);
}

// Draw Stack
export function drawStackTopCard(state) {
  return topCard(state.drawStack);
}

export function drawStackAnyCards(state) {
  return anyCards(state.drawStack);
}
