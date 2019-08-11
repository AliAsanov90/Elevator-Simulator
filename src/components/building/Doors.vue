<template>
  <div class="doors">
    <div
      class="door"
      :class="{ 'door-opened': openDoors }"
      @transitionend="onDoorClose"
    >
    </div>
    <div
      class="door"
      :class="{ 'door-opened': openDoors }"
      @transitionstart="onDoorOpen"
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
      openDoors: false,
      timeDoorsOpen: 4000,
      timeWaitAddFloor: 100,
      timeWaitDoorClose: 1000
    }
  },
  computed: {
    ...mapState([
      'elevPositionOnStop',
      'nextFloors',
      'isElevCalled',
      'elevStopped'
    ])
  },
  watch: {
    elevStopped() {
      if (this.floorNum === this.elevPositionOnStop) {
        this.openDoors = true
        this.closeDoors()
      }
      this.dontOpenOnDefaultFloor()
    },
    isElevCalled() {
      if (this.isElevCalled) {
        this.openOnFirstFloor()
      }
    }
  },
  methods: {
    ...mapActions([
      'doorClosed'
    ]),
    closeDoors() {
      setTimeout(() => {
        this.openDoors = false
      }, this.timeDoorsOpen)
    },
    dontOpenOnDefaultFloor() {
      if (this.nextFloors[0].direction === '') {
        this.openDoors = false
      }
    },
    openOnFirstFloor() {
      setTimeout(() => {
        if ((this.floorNum === 1) && (this.nextFloors[0].floor === 1)) {
          this.openDoors = true
          this.closeDoors()
        }
      }, this.timeWaitAddFloor)
    },
    onDoorClose() {
      if (!this.openDoors) {
        setTimeout(() => {
          this.doorClosed(true)
        }, this.timeWaitDoorClose)
      }
    },
    onDoorOpen() {
      if (this.openDoors) {
        this.doorClosed(false)
      }
    }
  }
}
</script>
