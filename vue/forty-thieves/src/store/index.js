import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex)

// const statics = {
//     cardNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
//     cardSuits: ["C", "D", "S", "H"],
//     decks: 2,
// }

const state = {
  count: 0,
  history: [],

  discardStack: null,
  drawStack: null,
  playStacks: [],
  dropStacks: [],
  selectedCard: undefined,
  logOn: false,
  logs: [],
  undoCount: 0,
  timer: null,
  startTime: new Date(),
  score: 0
}

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

if (module.hot) {
  module.hot.accept([
    './getters',
    './actions',
    './mutations'
  ], () => {
    store.hotUpdate({
      getters: require('./getters'),
      actions: require('./actions'),
      mutations: require('./mutations')
    })
  })
}

export default store
