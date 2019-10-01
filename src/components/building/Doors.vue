<template>
  <div class="doors">
    <div
      class="door"
      :class="{ 'door-opened': canOpenDoors }"
      @transitionstart="onDoorToggle"
    >
    </div>
    <div
      class="door"
      :class="{ 'door-opened': canOpenDoors }"
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
      canOpenDoors: false,
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
      if ((this.floorNum === this.elevPositionOnStop) && this.elevStopped) {
        this.canOpenDoors = true
        this.closeDoors()
      }
    },
    isElevCalled() {
      if (this.isElevCalled && this.elevStopped && this.floorNum === this.elevPosition) {
        this.canOpenDoors = true
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
        this.canOpenDoors = false
      }, this.timeDoorsOpen)
    },
    onDoorToggle() {
      if (this.canOpenDoors) {
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
