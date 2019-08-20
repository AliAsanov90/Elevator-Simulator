export default {
  floors: [1, 2, 3, 4, 5],
  prevFloor: {
    floor: 1,
    direction: 'up',
    hasPassed: false
  },
  nextFloors: [{
    floor: 1,
    direction: '',
    hasPassed: false
  }],
  direction: 'up', // current elev direction
  hasPassed: false, // whether elev has passed the floor that's being added to the order
  elevPosition: 1,
  elevPositionOnStop: 1,
  isElevCalled: false,
  isDoorClosed: true,
  elevStopped: true
}
