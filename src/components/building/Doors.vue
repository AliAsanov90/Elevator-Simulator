<template>
  <div class="doors">
    <div
      class="door"
      :class="{ 'door-opened': shouldOpenDoors }"
      @transitionstart="onDoorOpenClose"
    >
    </div>
    <div
      class="door"
      :class="{ 'door-opened': shouldOpenDoors }"
    >
    </div>
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
      shouldOpenDoors: false,
      timeDoorsOpen: 4000,
      timeWaitAddFloor: 100,
      timeWaitDoorClose: 1000
    }
  },
  computed: {
    ...mapState([
      'elevPosition',
      'elevPositionOnStop',
      'nextFloors',
      'isElevCalled',
      'elevStopped',
      'prevFloor'
    ])
  },
  watch: {
    elevPositionOnStop() {
      if (this.floorNum === this.elevPositionOnStop) {
        this.shouldOpenDoors = true
        this.closeDoors()
      }
    },
    isElevCalled() {
      if (this.isElevCalled && this.elevStopped && this.floorNum === this.elevPosition) {
        this.shouldOpenDoors = true
        this.closeDoors()
      }
    }
  },
  methods: {
    ...mapActions([
      'doorClosed'
    ]),
    closeDoors() {
      setTimeout(() => {
        this.shouldOpenDoors = false
      }, this.timeDoorsOpen)
    },
    onDoorOpenClose() {
      if (this.shouldOpenDoors) {
        this.doorClosed(false)
      } else {
        setTimeout(() => {
          this.doorClosed(true)
        }, this.timeWaitDoorClose)
      }
    }
  }
}
</script>
