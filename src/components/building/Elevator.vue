<template>
  <div
    class="elevator"
    :style="{
      bottom: (nextFloors[0] - 1) + '00px',
      transition: (prevNextDifference * secondsPerFloor) + 's'
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
      'direction'
    ]),
    ...mapGetters([
      'prevNextDifference'
    ])
  },
  methods: {
    ...mapActions([
      'removeFloor',
      'defineDirection'
    ]),
    onElevatorStop(e) {
      this.defineDirection()
      console.log('Going: ' + this.direction)

      this.removeFloor(this.nextFloors[0])
      console.log('Previous: ' + this.prevFloor)
      console.log('Next: ' + this.nextFloors)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/sass/components/building/_elevator.scss';
</style>
