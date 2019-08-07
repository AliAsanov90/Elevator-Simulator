
export default {
  // Add floor to the array of floors on button click
  addNextFloor: (state, { floor, direction = null, hasPassed }) => {
    // If direction not defined (when panel buttons are clicked)
    if (!direction) {
      if (hasPassed) {
        // if elev passed this floor, direction depends on if floor number is bigger than all floors in order
        const isNotBiggest = state.nextFloors.some(el => el.floor > floor)
        direction = isNotBiggest ? 'down' : 'up'
      } else {
        // if elev hasn't passed yet, the direction is the same as current elev direction
        direction = state.direction
      }
    }
    if (state.nextFloors[0].direction === '') {
      state.prevFloor = state.nextFloors[0]
    }
    // Filter out the initial floor from the array
    const withoutInitial = state.nextFloors.filter(el => el.direction !== '')
    // Filter the old array into 3 separate arrays
    // 1. if request is same direction and elev hasn't passed
    const firstPart = withoutInitial.filter(el => (el.direction === state.direction) && (el.hasPassed === false))
    // 2. if request is opposite direction
    const secondPart = withoutInitial.filter(el => (el.direction !== state.direction))
    // 3. if request is same direction, but elev has already passed
    const thirdPart = withoutInitial.filter(el => (el.direction === state.direction) && (el.hasPassed === true))
    // Compare the new request with each of the above 3 conditions, and
    // add new request to proper array and sort depending on state.direction
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
      // Combine 3 parts of array into one order of floors
      state.nextFloors = [...firstPart, ...secondPart, ...sortedThirdPart]
    }
  },
  // Find out the direction elev is going - Up or Down
  setDirection: (state, direction = null) => {
    state.direction = state.prevFloor.floor < state.nextFloors[0].floor ? 'up' : 'down'
  },
  // Remove current floor from order array
  removeCurrFloor: (state, { floor, direction, hasPassed }) => {
    // Set the previous floor to first floor in array
    state.prevFloor = { floor, direction, hasPassed }
    // Delete the current/first floor from array
    if (state.nextFloors.length) {
      state.nextFloors = state.nextFloors.slice(1)
    }
    // if there are no floors in array, add the default one
    if (!state.nextFloors.length) {
      state.nextFloors = [{ floor: 1, direction: '', hasPassed: false }]
    }
  },
  // Get Elevator Position
  getElevPosition: (state, offset) => {
    state.elevOffset = offset
  },
  // Find out the floor elev is passing now
  ifPassedRequest: (state, { floor }) => {
    if (state.elevOffset >= -2 && state.elevOffset < 90) state.elevPosition = 5
    if (state.elevOffset >= 90 && state.elevOffset < 190) state.elevPosition = 4
    if (state.elevOffset >= 190 && state.elevOffset < 290) state.elevPosition = 3
    if (state.elevOffset >= 290 && state.elevOffset < 380) state.elevPosition = 2
    if (state.elevOffset >= 380 && state.elevOffset <= 398) state.elevPosition = 1
    // Find out whether elev has passed the requested floor or not
    if (((state.direction === 'up') && (floor < state.elevPosition)) ||
      ((state.direction === 'down') && (floor >= state.elevPosition))) {
      state.hasPassed = true
    } else {
      state.hasPassed = false
    }
  },
  // Toogle when button clicked
  toggleElevCalled: (state, boolean) => {
    state.isElevCalled = boolean
  },
  // Set elev position when it stops
  getElevPositionOnStop: (state, elevPosition) => {
    state.elevPositionOnStop = elevPosition
  },
  // Toggle when doors are open/closed
  doorClosed: (state, boolean) => {
    state.isDoorClosed = boolean
  }
}
