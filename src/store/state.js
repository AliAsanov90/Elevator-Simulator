export default {
  floors: [1, 2, 3, 4, 5], // number of floors in the building
  prevFloor: {
    floor: 1,
    direction: 'up'
  },
  nextFloors: [{
    floor: 1,
    direction: ''
  }], // order of next floors
  direction: 'up', // "up" or "down"
  elevPosition: 1
}
