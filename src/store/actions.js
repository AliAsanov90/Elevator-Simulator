export default {
  addCurrentFloor: ({ commit }, payload) => {
    commit('addNextFloor', payload)
  },
  defineDirection: ({ commit }, payload) => {
    commit('setDirection', payload)
  },
  removeFloor: ({ commit }, payload) => {
    commit('removeCurrFloor', payload)
  }
}
