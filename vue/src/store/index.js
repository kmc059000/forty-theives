import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters';
import * as actions from './actions';
import * as mutations from './mutations';

Vue.use(Vuex);

const state = {
  count: 0,
  history: [],

  discardStack: null,
  drawStack: null,
  playStacks: [],
  dropStacks: [],
  selectedCard: null,
  selectedStack: null,
  undoCount: 0,
  timer: null,
  startTime: null,
  score: 0,

  difficulty: '4',
  cycleMode: false,
};

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});

export default store;

