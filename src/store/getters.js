export default {
  reversedFloors: state => state.floors.reverse(),
  prevNextDifference: ({ prevFloor, nextFloors }) => Math.abs(nextFloors[0] - prevFloor)
}
