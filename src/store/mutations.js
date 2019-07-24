export default {
  // Add elevator call to the order
  addNextFloor: (state, { floor, direction }) => {
    if (state.direction === direction) {
      if (state.nextFloors.every(floorEl => floorEl > floor) && state.direction === 'up') {
        state.nextFloors = [floor, ...state.nextFloors]
      } else {
        state.nextFloors = [...state.nextFloors, floor]
      }
    } else {
      if (state.nextFloors.every(floorEl => floorEl > floor)) {
        state.nextFloors = [...state.nextFloors, floor]
      } else {
        state.nextFloors = [floor, ...state.nextFloors]
      }
    }
  },
  // Find out direction - Up or Down
  setDirection: (state, payload = null) => {
    state.direction = state.prevFloor < state.nextFloors[0] ? 'up' : 'down'
  },
  removeCurrFloor: (state, payload) => {
    state.prevFloor = payload
    state.nextFloors = state.nextFloors.slice(1)
  }
}
