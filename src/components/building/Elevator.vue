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
      secondsPerFloor: 2
    }
  },
  computed: {
    ...mapState([
      'prevFloor',
      'nextFloors',
      'direction',
      'elevPosition',
      'passedFloor',
      'isElevCalled'
    ]),
    ...mapGetters([
      'prevNextDifference'
    ]),
    nextFloor() {
      return this.nextFloors[0].floor
    },
    calcBottom() {
      const floorNumbers = this.nextFloors.map(el => el.floor)
      const len = this.nextFloors.length
      if (len > 1) {
        for (let i = 0; i < len; i++) {
          if (floorNumbers[i] === floorNumbers[i + 1]) {
            this.removeFloor(this.nextFloors[i])
          }
        }
      }
      // if (this.nextFloors[0].floor === this.prevFloor.floor) {
      //   this.removeFloor(this.nextFloors[0])
      // }
      return (this.nextFloors[0].floor - 1) + '00px'
    }
  },
  methods: {
    ...mapActions([
      'removeFloor',
      'defineDirection',
      'getElevPosition',
      'elevStartedTime',
      'toggleElevCalled',
      'ifPassedRequest',
      'getElevPositionOnStop'
    ]),
    onElevatorStop(e) {
      // console.log(this.elevPosition)
      this.getElevPositionOnStop(this.elevPosition)
      if (this.nextFloors[0].direction !== '') {
        setTimeout(() => {
          this.removeFloor(this.nextFloors[0])
          this.defineDirection()
        }, 5000)
      } else {
        this.removeFloor(this.nextFloors[0])
        this.defineDirection()
      }
    },
    onElevatorStart(e) {
      setInterval(() => {
        this.getElevPosition(this.$el.offsetTop)
        this.ifPassedRequest(1)
      }, 100)
      this.defineDirection()
    }
  },
  watch: {
    isElevCalled: function() {
      if (this.isElevCalled) {
        this.getElevPosition(this.$el.offsetTop)
        this.toggleElevCalled(false)
      }
    }
    // nextFloors() {
    //   if (this.nextFloors[0].direction === '') {
    //     this.defineDirection('up')
    //   }
    // }
  },
  mounted() {
    // console.log('Previous Floor: ' + this.prevFloor.floor)
    // console.log('Next Floors: ' + this.nextFloors[0].floor)
  }
}
</script>
