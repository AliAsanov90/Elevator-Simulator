/* eslint-disable */
export default {
  addNextFloor: (state, { floor, direction = null, hasPassed }) => {
    // Helper Function
    const sortFunc = (a, b) => {
      if (direction === 'up') {
        return a.floor - b.floor
      } else if (direction === 'down') {
        return b.floor - a.floor
      }
    }
    // So that difference between previous and next floor in not 0
    if (state.nextFloors[0].direction === '') {
      state.prevFloor.floor = 1
    }
    // Define requested direction
    if (!direction) {
      const IsFloorNotHighest = state.nextFloors.some(el => el.floor > floor)
      direction = IsFloorNotHighest ? 'down' : 'up'
    }

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
        .sort(sortFunc)
      state.nextFloors = [...sortedFirstPart, ...secondPart, ...thirdPart]
    }
    else if (direction !== state.direction) {
      const sortedSecondPart = [...secondPart, { floor, direction, hasPassed }]
        .sort(sortFunc)
      state.nextFloors = [...firstPart, ...sortedSecondPart, ...thirdPart]
    }
    else if ((direction === state.direction) && (hasPassed === true)) {
      const sortedThirdPart = [...thirdPart, { floor, direction, hasPassed }]
        .sort(sortFunc)
      state.nextFloors = [...firstPart, ...secondPart, ...sortedThirdPart]
    }
  },
  removeCurrFloor: (state, { floor, direction, hasPassed }) => {
    const deleteVisitedFloor = () => {
      if (state.nextFloors.length) {
        state.nextFloors = state.nextFloors.slice(1)
      }
    }
    const addDefaultFloor = () => {
      if (!state.nextFloors.length) {
        state.nextFloors = [{ floor: 1, direction: '', hasPassed: false }]
      }
    }
    state.prevFloor = { floor, direction, hasPassed }
    deleteVisitedFloor()
    addDefaultFloor()
  },
  getElevPosition: (state, offset) => {
    if (offset >= -2 && offset < 90) state.elevPosition = 5
    if (offset >= 90 && offset < 190) state.elevPosition = 4
    if (offset >= 190 && offset < 290) state.elevPosition = 3
    if (offset >= 290 && offset < 380) state.elevPosition = 2
    if (offset >= 380 && offset <= 398) state.elevPosition = 1
  },
  ifPassedRequest: (state, { floor }) => {
    if (((state.direction === 'up') && (floor < state.elevPosition)) ||
      ((state.direction === 'down') && (floor >= state.elevPosition))) {
      state.hasPassed = true
    } else {
      state.hasPassed = false
    }
  },
  setDirection: (state, direction = null) => {
    state.direction = state.prevFloor.floor < state.nextFloors[0].floor ? 'up' : 'down'
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
