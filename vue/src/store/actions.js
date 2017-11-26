import { indexOf } from 'lodash';
import { filter, flow, head } from 'lodash/fp';
import { canDropOnDropStackCard, canDropOnOpenCard, topCard } from './helpers';

export const deal = ({ commit }) => commit('deal');
export const drawCard = ({ commit }) => commit('drawCard');
export const deselect = ({ commit }) => commit('deselect');
export const selectDiscardStack = ({ commit }) => commit('selectDiscardStack');
export const selectPlayStack = ({ commit }, index) => commit('selectPlayStack', index);
export const selectDropStack = ({ commit }, index) => commit('selectDropStack', index);
export const undo = ({ commit }) => commit('undo');

export const setSuitMode = ({ commit }, mode) => commit('setSuitMode', mode);
export const setCycleMode = ({ commit }, mode) => commit('setCycleMode', mode);

export function autoMove({ state, commit }, { card, selectCardFn }) {
  // search drop stacks
  const dropStack = flow(
    filter(s => canDropOnDropStackCard(card, topCard(s))),
    head,
  )(state.dropStacks);
  if (dropStack) {
    const destinationIndex = indexOf(state.dropStacks, dropStack);
    selectCardFn();
    commit('selectDropStack', destinationIndex);
  }

  // search playstacks
  const playStack = flow(
    filter(s => canDropOnOpenCard(state.difficulty, topCard(s), card)),
    head,
  )(state.playStacks);
  if (playStack) {
    const destinationIndex = indexOf(state.playStacks, playStack);
    selectCardFn();
    commit('selectPlayStack', destinationIndex);
  }

  commit('deselect');
}

export function autoMovePlayStack({ commit, state, dispatch }, index) {
  const stack = state.playStacks[index];
  const card = topCard(stack);
  if (!card) {
    return;
  }

  dispatch('autoMove', {
    card,
    selectCardFn: () => commit('selectPlayStack', index),
  });
}

export function autoMoveDiscardStack({ commit, state, dispatch }) {
  const stack = state.discardStack;
  const card = topCard(stack);
  if (!card) {
    return;
  }

  dispatch('autoMove', {
    card,
    selectCardFn: () => commit('selectDiscardStack'),
  });
}
