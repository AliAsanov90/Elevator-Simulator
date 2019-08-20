/* eslint-disable */
export default {
  addNextFloor: (state, { floor, direction = null, hasPassed }) => {
    // Exclude Initial floor from array
    const withoutInitialFloor = state.nextFloors.filter(el => el.direction !== '')

    // Filter the old array into 3 separate arrays
    const firstPart = withoutInitialFloor
      .filter(el => (el.direction === state.direction) && (el.hasPassed === false))
    const secondPart = withoutInitialFloor
      .filter(el => (el.direction !== state.direction))
    const thirdPart = withoutInitialFloor
      .filter(el => (el.direction === state.direction) && (el.hasPassed === true))

    // Add new request to proper array, sort, and combine parts
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
    }
    else if (direction !== state.direction) {
      const sortedSecondPart = [...secondPart, { floor, direction, hasPassed }]
        .sort((a, b) => {
          if (direction === 'up') {
            return a.floor - b.floor
          } else if (direction === 'down') {
            return b.floor - a.floor
          }
        })
      state.nextFloors = [...firstPart, ...sortedSecondPart, ...thirdPart]
    }
    else if ((direction === state.direction) && (hasPassed === true)) {
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
  removeCurrFloor: (state, { floor, direction, hasPassed }) => {
    state.prevFloor = { floor, direction, hasPassed }
    if (state.nextFloors.length > 1) {
      state.nextFloors = [...state.nextFloors].slice(1)
    }
  },
  getElevPosition: (state, offset) => {
    if (offset >= -2 && offset < 98) state.elevPosition = 5
    if (offset >= 98 && offset < 198) state.elevPosition = 4
    if (offset >= 198 && offset < 298) state.elevPosition = 3
    if (offset >= 298 && offset < 397) state.elevPosition = 2
    if (offset >= 397 && offset <= 398) state.elevPosition = 1
  },
  ifPassedRequest: (state, { floor, direction }) => {
    if (((state.direction === 'up') && (direction === 'up') && (floor < state.elevPosition)) ||
      ((state.direction === 'down') && (direction === 'down') && (floor >= state.elevPosition))) {
      state.hasPassed = true
    } else {
      state.hasPassed = false
    }
  },
  setDirection: (state, direction = null) => {
    if (direction) {
      state.direction = direction
    } else {
      state.direction = state.prevFloor.floor <= state.nextFloors[0].floor ? 'up' : 'down'
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
  },
  didElevStop: (state, boolean) => {
    state.elevStopped = boolean
  },
  deleteSameFloor: state => {
    state.nextFloors = [...state.nextFloors].slice(1)
  }
}
