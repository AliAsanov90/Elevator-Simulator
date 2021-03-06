export default {
  addCurrentFloor: ({ commit }, payload) => {
    commit('addNextFloor', payload)
  },
  defineDirection: ({ commit }) => {
    commit('setDirection')
  },
  removeFloor: ({ commit }, payload) => {
    commit('removeCurrFloor', payload)
  },
  ifPassedRequest: ({ commit }, payload) => {
    commit('ifPassedRequest', payload)
  },
  getElevPosition: ({ commit }, payload) => {
    commit('getElevPosition', payload)
  },
  toggleElevCalled: ({ commit }, payload) => {
    commit('toggleElevCalled', payload)
  },
  getElevPositionOnStop: ({ commit }, payload) => {
    commit('getElevPositionOnStop', payload)
  },
  doorClosed: ({ commit }, payload) => {
    commit('doorClosed', payload)
  },
  didElevStop: ({ commit }, payload) => {
    commit('didElevStop', payload)
  },
  deleteSameFloor: ({ commit }, index) => {
    commit('deleteSameFloor', index)
  }
}
