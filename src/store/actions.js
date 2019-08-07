export default {
  addCurrentFloor: ({ commit }, payload) => {
    commit('addNextFloor', payload)
  },
  defineDirection: ({ commit }, payload) => {
    commit('setDirection', payload)
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
  }
}
