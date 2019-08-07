<template>
  <div
    class="elevator"
    :style="{
      bottom: calcBottom,
      transition: (prevNextDifference * secondsPerFloor) + 's'
    }"
    @transitionend="onElevatorStop"
    @transitionstart="onElevatorStart"
  >
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      secondsPerFloor: 2 // time elev passes one floor
    }
  },
  computed: {
    ...mapState([
      'nextFloors',
      'elevPosition',
      'isElevCalled'
    ]),
    ...mapGetters([
      'prevNextDifference'
    ]),
    calcBottom() {
      const floorNumbers = this.nextFloors.map(el => el.floor)
      const len = this.nextFloors.length
      if (len > 1) {
        for (let i = 0; i < len; i++) {
          // If there equal numbers of floors next to each other, remove one of them
          if (floorNumbers[i] === floorNumbers[i + 1]) {
            this.removeFloor(this.nextFloors[i])
          }
        }
      } // return number of pixels for next elev position
      return (this.nextFloors[0].floor - 1) + '00px'
    }
  },
  methods: {
    ...mapActions([
      'removeFloor',
      'defineDirection',
      'getElevPosition',
      'toggleElevCalled',
      'ifPassedRequest',
      'getElevPositionOnStop'
    ]),
    onElevatorStop(e) {
      // After stop notify about position for doors to open
      this.getElevPositionOnStop(this.elevPosition)
      // Wait 5 sec till doors are closed, remove current floor from order, define direction
      setTimeout(() => {
        this.removeFloor(this.nextFloors[0])
        this.defineDirection()
      }, 5000)
    },
    onElevatorStart(e) {
      // Get elev position every 100ms
      setInterval(() => {
        this.getElevPosition(this.$el.offsetTop)
        this.ifPassedRequest(1)
      }, 100)
      this.defineDirection()
    }
  },
  watch: {
    isElevCalled: function() {
      // Get elev position when elev is called
      if (this.isElevCalled) {
        this.getElevPosition(this.$el.offsetTop)
        this.toggleElevCalled(false)
      }
    }
  }
}
</script>
