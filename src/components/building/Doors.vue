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
          this.doorClosed(true)
        }, 500)
      }
    },
    onDoorOpen() {
      if (this.elevStopped) {
        this.doorClosed(false)
      }
    }
  }
}
</script>
