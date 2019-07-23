export default {
  addNextFloor: (state, { floor, direction }) => {
    if (state.direction === direction) {
      if (state.nextFloors.every(floorEl => floorEl >= floor)) {
        state.nextFloors = [floor, ...state.nextFloors]
      } else {
        state.nextFloors = [...state.nextFloors, floor]
      }
    } else {
      state.nextFloors = [...state.nextFloors, floor]
    }
  }
}
