export default {
  // Add elevator call to the order
  addNextFloor: (state, { floor, direction }) => {
    // stop when going UP and the request floor is HIGHER or SAME floor as elevator
    // OR when going DOWN and the request floor is LOWER or SAME floor as elevator
    if ((state.direction === 'up' && state.elevPosition <= floor) ||
      (state.direction === 'down' && state.elevPosition >= floor)) {
      const allFloors = [...state.nextFloors, { floor, direction }]
      const goingUp = allFloors
        .filter(el => el.direction === 'up')
        .sort((a, b) => a.floor - b.floor)
      const goingDown = allFloors
        .filter(el => el.direction === 'down')
        .sort((a, b) => b.floor - a.floor)
      state.nextFloors = state.direction === 'up' ? [...goingUp, ...goingDown] : [...goingDown, ...goingUp]
    } else {
    // if elevator already PASSED the request floor then add request to the END of order
      state.nextFloors = [...state.nextFloors, { floor, direction }]
    }
  },
  // Find out direction - Up or Down
  setDirection: (state, payload = null) => {
    state.direction = state.prevFloor.floor < state.nextFloors[0].floor ? 'up' : 'down'
  },
  removeCurrFloor: (state, { floor, direction }) => {
    state.prevFloor = { floor: floor, direction: direction }
    if (state.nextFloors.length) {
      state.nextFloors = state.nextFloors.slice(1)
    }
    if (!state.nextFloors.length) {
      state.nextFloors = [{ floor: 1, direction: '' }]
      state.direction = 'up'
    }
  },
  // Get Elevator Position
  getElevPosition: (state, offset) => {
    if (offset >= -2 && offset < 90) state.elevPosition = 5
    if (offset >= 90 && offset < 190) state.elevPosition = 4
    if (offset >= 190 && offset < 290) state.elevPosition = 3
    if (offset >= 290 && offset < 390) state.elevPosition = 2
    if (offset >= 390 && offset <= 398) state.elevPosition = 1
  }
}

// addNextFloor: (state, { floor, direction }) => {
//   if (state.direction === direction) {
//     if (state.nextFloors.every(floorEl => floorEl > floor) && state.direction === 'up') {
//       state.nextFloors = [floor, ...state.nextFloors]
//     } else {
//       state.nextFloors = [...state.nextFloors, floor]
//     }
//   } else {
//     if (state.nextFloors.every(floorEl => floorEl > floor)) {
//       state.nextFloors = [...state.nextFloors, floor]
//     } else {
//       state.nextFloors = [floor, ...state.nextFloors]
//     }
//   }
// }
