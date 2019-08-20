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
      secondsPerFloor: 2,
      timeWaitDoors: 5000,
      intervalCheckElev: 100
    }
  },
  computed: {
    ...mapState([
      'nextFloors',
      'elevPosition',
      'isElevCalled',
      'prevFloor',
      'elevStopped'
    ]),
    ...mapGetters([
      'prevNextDifference'
    ]),
    calcBottom() {
      this.removeSameAdjacentFloor()
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
      'getElevPositionOnStop',
      'didElevStop',
      'deleteSameFloor'
    ]),
    removeSameAdjacentFloor() {
      if (this.nextFloors.length > 1) {
        if ((this.nextFloors[0].floor === this.nextFloors[1].floor) &&
          (this.nextFloors[0].direction === this.nextFloors[1].direction)) {
          this.deleteSameFloor()
        }
      }
    },
    onElevatorStop(e) {
      this.getElevPositionOnStop(this.elevPosition)
      this.didElevStop(true)
      this.goToNextAfterDoorClosed()
    },
    onElevatorStart(e) {
      this.didElevStop(false)
      setInterval(() => {
        this.getElevPosition(this.$el.offsetTop)
      }, this.intervalCheckElev)
      this.defineDirection()
    },
    goToNextAfterDoorClosed() {
      setTimeout(() => {
        this.removeFloor(this.nextFloors[0])
        this.defineDirection()
      }, this.timeWaitDoors)
    },
    goToNextFloor() {
      this.removeFloor(this.nextFloors[0])
      this.defineDirection()
    }
  },
  watch: {
    isElevCalled() {
      if (this.isElevCalled) {
        this.getElevPosition(this.$el.offsetTop)
        this.toggleElevCalled(false)
      }
    }
  }
}
</script>
