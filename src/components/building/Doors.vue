<template>
  <div class="doors">
    <div
      class="door"
      :class="{ 'door-opened': elevStopped }"
      @transitionend="onDoorClosed"
    >
    </div>
    <div
      class="door"
      :class="{ 'door-opened': elevStopped }"
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
      elevStopped: false
    }
  },
  computed: {
    ...mapState([
      'elevPositionOnStop',
      'nextFloors',
      'isElevCalled'
    ])
  },
  watch: {
    elevPositionOnStop() {
      // Check if elevator stopped on THIS floor
      if (this.floorNum === this.elevPositionOnStop) {
        // Open the doors
        this.elevStopped = true
        // After 4 sec close the doors (3 sec for waiting + 1 sec for closing)
        setTimeout(() => {
          this.elevStopped = false
        }, 4000)
      }
      // If there are no more requested floors left,
      // then DON'T OPEN the doors after arriving to the default 1st floor
      if (this.nextFloors[0].direction === '') {
        this.elevStopped = false
      }
    },
    isElevCalled() {
      // Watch if elevator was called
      if (this.isElevCalled) {
        setTimeout(() => {
          // OPEN doors if elev was called on the 1st floor while being on that 1st floor
          if ((this.floorNum === 1) && (this.nextFloors[0].floor === 1)) {
            this.elevStopped = true
            // CLOSE doors after 4 sec
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
      // Watch when doors start to close
      if (!this.elevStopped) {
        // Change state 500ms after doors starting to close
        setTimeout(() => {
          this.doorClosed(true)
        }, 500)
      }
    },
    onDoorOpen() {
      // If doors start to open, change state to opposite
      if (this.elevStopped) {
        this.doorClosed(false)
      }
    }
  }
}
</script>
