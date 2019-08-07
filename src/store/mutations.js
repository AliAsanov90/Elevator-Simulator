
export default {
  addNextFloor: (state, { floor, direction = null, hasPassed }) => {
    if (!direction) {
      if (hasPassed) {
        const isNotBiggest = state.nextFloors.some(el => el.floor > floor)
        direction = isNotBiggest ? 'down' : 'up'
      } else {
        direction = state.direction
      }
    }
    if (state.nextFloors[0].direction === '') {
      state.prevFloor = state.nextFloors[0]
    }
    // Filter out the initial floor from the array
    const withoutInitial = state.nextFloors.filter(el => el.direction !== '')
    // Filter the old array into 3 saparate arrays
    const firstPart = withoutInitial.filter(el => (el.direction === state.direction) && (el.hasPassed === false))
    const secondPart = withoutInitial.filter(el => (el.direction !== state.direction))
    const thirdPart = withoutInitial.filter(el => (el.direction === state.direction) && (el.hasPassed === true))
    // Compare the new item with each of the 3 conditions
    // Add the new item and sort according to state.direction
    if ((direction === state.direction) && (hasPassed === false)) {
      const sortedFirstPart = [...firstPart, { floor, direction, hasPassed }]
        .sort((a, b) => {
          if (direction === 'up') {
            return a.floor - b.floor
          } else if (direction === 'down') {
            return b.floor - a.floor
          }
        })
      state.nextFloors = [...sortedFirstPart, ...secondPart, ...thirdPart]
    } else if (direction !== state.direction) {
      const sortedSecondPart = [...secondPart, { floor, direction, hasPassed }]
        .sort((a, b) => {
          if (direction === 'up') {
            return a.floor - b.floor
          } else if (direction === 'down') {
            return b.floor - a.floor
          }
        })
      state.nextFloors = [...firstPart, ...sortedSecondPart, ...thirdPart]
    } else if ((direction === state.direction) && (hasPassed === true)) {
      const sortedThirdPart = [...thirdPart, { floor, direction, hasPassed }]
        .sort((a, b) => {
          if (direction === 'up') {
            return a.floor - b.floor
          } else if (direction === 'down') {
            return b.floor - a.floor
          }
        })
      state.nextFloors = [...firstPart, ...secondPart, ...sortedThirdPart]
    }
  },
  // Find out direction - Up or Down
  setDirection: (state, direction = null) => {
    state.direction = state.prevFloor.floor < state.nextFloors[0].floor ? 'up' : 'down'
  },
  // When elevator stops, remove current floor from order
  removeCurrFloor: (state, { floor, direction, hasPassed }) => {
    state.prevFloor = { floor, direction, hasPassed }
    if (state.nextFloors.length) {
      state.nextFloors = state.nextFloors.slice(1)
    }
    if (!state.nextFloors.length) {
      state.nextFloors = [{ floor: 1, direction: '', hasPassed: false }]
    }
  },
  // Get Elevator Position
  getElevPosition: (state, offset) => {
    state.elevOffset = offset
  },
  // Find out if elevator has passed or not
  ifPassedRequest: (state, { floor }) => {
    if (state.elevOffset >= -2 && state.elevOffset < 90) state.elevPosition = 5
    if (state.elevOffset >= 90 && state.elevOffset < 190) state.elevPosition = 4
    if (state.elevOffset >= 190 && state.elevOffset < 290) state.elevPosition = 3
    if (state.elevOffset >= 290 && state.elevOffset < 380) state.elevPosition = 2
    if (state.elevOffset >= 380 && state.elevOffset <= 398) state.elevPosition = 1
    if (((state.direction === 'up') && (floor < state.elevPosition)) ||
      ((state.direction === 'down') && (floor >= state.elevPosition))) {
      state.hasPassed = true
    } else {
      state.hasPassed = false
    }
  },
  toggleElevCalled: (state, boolean) => {
    state.isElevCalled = boolean
  },
  getElevPositionOnStop: (state, elevPosition) => {
    state.elevPositionOnStop = elevPosition
  },
  doorClosed: (state, boolean) => {
    state.isDoorClosed = boolean
  }
}
