<template>
  <div>
    <button
      :class="{ 'active-button': clicked }"
      class="button"
      type="button"
      @click="callElevator"
    >
      <slot></slot>
    </button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: {
    floor: Number
  },
  data() {
    return {
      clicked: false
    }
  },
  computed: {
    ...mapState([
      'prevFloor',
      'hasPassed',
      'elevPosition',
      'elevPositionOnStop',
      'isDoorClosed'
    ])
  },
  watch: {
    elevPositionOnStop() {
      // When elev arrived to this floor, remove button highlighting
      if (this.elevPositionOnStop === this.floor) {
        this.clicked = false
      }
    }
  },
  methods: {
    ...mapActions([
      'addCurrentFloor',
      'ifPassedRequest',
      'toggleElevCalled'
    ]),
    callElevator() {
      // Highlight the button
      this.clicked = true
      // If elevator is on 1st floor and button of 1st floor was called
      if ((this.floor === 1) && (this.prevFloor.floor === 1) && (this.elevPosition === 1)) {
        this.toggleElevCalled(true) // Notify that elev was called to open the doors
        this.clicked = false // no need to highlight the button
        return // just open doors, no need to add floor to the order
      }
      // If elev is on the 1st floor and doors are not closed yet,
      // wait 5 sec till doors are closed, and then add new floor to the order
      if (!this.isDoorClosed && (this.elevPosition === 1)) {
        setTimeout(() => {
          this.addCurrentFloor({ floor: this.floor, hasPassed: this.hasPassed })
        }, 4700)
      } else {
        // Add new floor immediately
        setTimeout(() => {
          this.addCurrentFloor({ floor: this.floor, hasPassed: this.hasPassed })
        }, 10)
      }
      // Toggle Elevator calling to notify other components
      this.toggleElevCalled(true)
      // Find out whether Elevator has passed THIS floor or not
      setTimeout(() => {
        this.ifPassedRequest({ floor: this.floor })
      }, 5)
    }
  }
}
</script>
