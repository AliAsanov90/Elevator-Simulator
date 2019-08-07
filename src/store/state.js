export default {
  floors: [1, 2, 3, 4, 5], // Total quantity of floors
  prevFloor: {
    floor: 1,
    direction: 'up',
    hasPassed: false
  },
  // Array of floors added, order of floors
  nextFloors: [{
    floor: 1,
    direction: '',
    hasPassed: false
  }],
  direction: 'up', // current direction in which elev moves
  hasPassed: false, // whether elev has passed the floor that's being added to the order
  elevOffset: 0, // elev offset from the top of the building
  elevPosition: 1, // floor elev is passing now
  elevPositionOnStop: 0, // Floor at which elev has stopped
  isElevCalled: false, // toggled when buttons are clicked
  isDoorClosed: true // whether doors are closed or not
}
