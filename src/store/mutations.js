
export default {
  addNextFloor: (state, { floor, direction = state.direction, hasPassed }) => {
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
    if (direction) {
      state.direction = direction
    } else {
      state.direction = state.prevFloor.floor < state.nextFloors[0].floor ? 'up' : 'down'
    }
    // console.log('Previous Floor: ' + state.prevFloor.floor)
    // console.log('Next Floor: ' + state.nextFloors[0].floor)
    // console.log('Direction: ' + state.direction)
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
      ((state.direction === 'down') && (floor > state.elevPosition))) {
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

// if (state.passedFloor) {
//   state.nextFloors = [...state.nextFloors, { floor, direction, passed: state.passedFloor }]
// } else {
//   const allFloors = [...state.nextFloors, { floor, direction, passed: state.passedFloor }]
//   const goingUp = allFloors
//     .filter(el => el.direction === 'up')
//     .sort((a, b) => a.floor - b.floor)
//   const goingDown = allFloors
//     .filter(el => el.direction === 'down')
//     .sort((a, b) => b.floor - a.floor)
//   state.nextFloors = state.direction === 'up' ? [...goingUp, ...goingDown] : [...goingDown, ...goingUp]
// }

// const sortFunc = (a, b) => {
//   if (((state.direction === 'up') && (direction === 'up')) ||
//     ((state.direction === 'down') && (direction === 'up'))) {
//     return a.floor - b.floor
//   } else if (((state.direction === 'down') && (direction === 'down')) ||
//     ((state.direction === 'up') && (direction === 'down'))) {
//     return b.floor - a.floor
//   }
// }

// const allFloors = [...state.nextFloors, { floor, direction, hasPassed }]
//       .filter(el => el.direction !== '')
//     // Floors that are SAME direction and NOT been passed
//     const firstPart = allFloors
//       .filter(el => el.direction === state.direction && el.hasPassed === false)
//       .sort((a, b) => {
//         if (state.direction === 'up') {
//           return a.floor - b.floor
//         } else {
//           return b.floor - a.floor
//         }
//       })
//     // Floors that are OPPOSITE direction
//     const secondPart = allFloors
//       .filter(el => el.direction !== state.direction)
//       .sort((a, b) => {
//         if (state.direction === 'up') {
//           return a.floor - b.floor
//         } else {
//           return b.floor - a.floor
//         }
//       })
//     // Floors that SAME direction but were PASSED
//     const thirdPart = allFloors
//       .filter(el => el.direction === state.direction && el.hasPassed === true)
//       .sort((a, b) => {
//         if (state.direction === 'up') {
//           return a.floor - b.floor
//         } else {
//           return b.floor - a.floor
//         }
//       })
//     state.nextFloors = [...firstPart, ...secondPart, ...thirdPart]
