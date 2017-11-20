export const deal = ({ commit }) => commit('deal');
export const drawCard = ({ commit }) => commit('drawCard');
export const deselect = ({ commit }) => commit('deselect');
export const selectDiscardStack = ({ commit }) => commit('selectDiscardStack');
export const selectPlayStack = ({ commit }, index) => commit('selectPlayStack', index);
export const selectDropStack = ({ commit }, index) => commit('selectDropStack', index);
export const undo = ({ commit }) => commit('undo');
