export const drawCard = ({ commit }) => commit('drawCard')

export const selectDiscardStack = ({ commit }) => commit('selectDiscardStack')
export const selectPlayStack = ({ commit }, index) => commit('selectPlayStack', index)
