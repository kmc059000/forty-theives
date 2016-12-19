export const drawCard = ({ commit }) => commit('drawCard')

export const selectDiscardStack = ({ commit }) => commit('selectDiscardStack')
export const selectPlayStack = ({ commit }, index) => commit('selectPlayStack', index)
export const selectDropStack = ({ commit }, index) => commit('selectDropStack', index)
