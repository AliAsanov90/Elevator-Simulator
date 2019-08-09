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
      'isElevCalled'
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
      'getElevPositionOnStop'
    ]),
    removeSameAdjacentFloor() {
      const floorNumbers = this.nextFloors.map(el => el.floor)
      const len = this.nextFloors.length
      if (len > 1) {
        for (let i = 0; i < len; i++) {
          if (floorNumbers[i] === floorNumbers[i + 1]) {
            this.removeFloor(this.nextFloors[i])
          }
        }
      }
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
    },
    onElevatorStop(e) {
      this.getElevPositionOnStop(this.elevPosition)
      if (this.nextFloors[0].direction !== '') {
        this.goToNextAfterDoorClosed()
      } else if (this.nextFloors[0].direction === '') {
        this.goToNextFloor()
      }
    },
    onElevatorStart(e) {
      setInterval(() => {
        this.getElevPosition(this.$el.offsetTop)
        this.ifPassedRequest(1)
      }, this.intervalCheckElev)
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
