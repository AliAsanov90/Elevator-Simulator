<template>
  <div class="doors">
    <div class="door" :class="{ 'door-opened': elevStopped }" @transitionend="onDoorClosed"></div>
    <div class="door" :class="{ 'door-opened': elevStopped }" @transitionstart="onDoorOpen"></div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: {
    floorNum: Number
  },
  data() {
    return {
      elevStopped: false
    }
  },
  computed: {
    ...mapState([
      'prevFloor',
      'elevPositionOnStop',
      'elevPosition',
      'nextFloors',
      'isElevCalled',
      'isDoorClosed'
    ])
  },
  watch: {
    elevPositionOnStop() {
      if (this.floorNum === this.elevPositionOnStop) {
        this.elevStopped = true
        // console.log(this.elevStopped)
        setTimeout(() => {
          this.elevStopped = false
        }, 4000)
      }
      if (this.nextFloors[0].direction === '') {
        this.elevStopped = false
      }
    },
    isElevCalled() {
      if (this.isElevCalled) {
        setTimeout(() => {
          if ((this.floorNum === 1) && (this.nextFloors[0].floor === 1)) {
            this.elevStopped = true
            // console.log(this.floorNum)
            setTimeout(() => {
              this.elevStopped = false
            }, 4000)
          }
        }, 100)
      }
    }
  },
  methods: {
    ...mapActions([
      'doorClosed'
    ]),
    onDoorClosed(e) {
      if (!this.elevStopped) {
        setTimeout(() => {
          // console.log(this.isDoorClosed)
          // console.log('Doors closed')
          this.doorClosed(true)
          // console.log(this.isDoorClosed)
        }, 500)
      }
    },
    onDoorOpen() {
      if (this.elevStopped) {
        // console.log(this.isDoorClosed)
        // console.log('Doors open')
        this.doorClosed(false)
        // console.log(this.isDoorClosed)
      }
    }
  }
}
</script>
