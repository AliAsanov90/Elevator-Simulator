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
  direction: 'up',
  elevStarted: 0,
  hasPassed: false,
  elevOffset: 0,
  elevPosition: 1,
  elevPositionOnStop: 0,
  isElevCalled: false,
  isDoorClosed: true
}
