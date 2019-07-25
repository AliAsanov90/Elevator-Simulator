<template>
  <div
    class="elevator"
    ref="elevator"
    :style="{
      bottom: calcBottom,
      transition: ((prevNextDifference * secondsPerFloor) || 2) + 's'
    }"
    @transitionend="onElevatorStop"
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
      'elevPosition'
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
      return (this.nextFloors[0].floor - 1) + '00px'
    }
  },
  methods: {
    ...mapActions([
      'removeFloor',
      'defineDirection',
      'getElevPosition'
    ]),
    onElevatorStop(e) {
      this.removeFloor(this.nextFloors[0])
      // this.nextFloors.forEach(el => console.log(el.direction, el.floor))
      // console.log(this.prevFloor.floor, this.prevFloor.direction)
      // console.log(this.nextFloors)

      this.defineDirection()
      // console.log(this.direction)
      // console.log('floors: ' + this.nextFloors.map(el => el.floor))
      // console.log(this.$refs.elevator.offsetTop)
    }
  },
  updated() {
    this.getElevPosition(this.$refs.elevator.offsetTop)
    console.log(this.elevPosition)
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/sass/components/building/_elevator.scss';
</style>
