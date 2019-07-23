export default {
  addCurrentFloor: ({ commit }, payload) => {
    commit('addNextFloor', payload)
  }
}
