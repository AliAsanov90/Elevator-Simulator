export default {
  reversedFloors: state => state.floors.reverse(),
  prevNextDifference: state => Math.abs(state.nextFloors[0].floor - state.prevFloor.floor)
}
