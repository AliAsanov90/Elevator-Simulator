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
      'nextFloors',
      'prevFloor',
      'direction',
      'hasPassed',
      'elevPosition',
      'elevPositionOnStop',
      'isDoorClosed'
    ])
  },
  watch: {
    elevPositionOnStop() {
      if (this.elevPositionOnStop === this.floor) {
        this.clicked = false
      }
    }
  },
  methods: {
    ...mapActions([
      'addCurrentFloor',
      'ifPassedRequest',
      'addNewFloor',
      'toggleElevCalled'
    ]),
    callElevator() {
      this.clicked = true
      // If elevator is on 1st floor and button of 1st floor was called
      if ((this.floor === 1) && (this.prevFloor.floor === 1) && (this.elevPosition === 1)) {
        this.toggleElevCalled(true)
        this.clicked = false
        return
      }
      // Add this new elevator call
      // If doors are not closed yet, wait
      if (!this.isDoorClosed) {
        setTimeout(() => {
          this.addCurrentFloor({ floor: this.floor, hasPassed: this.hasPassed })
        }, 4700)
      } else {
        // Doors are closed now, add new floor
        setTimeout(() => {
          this.addCurrentFloor({ floor: this.floor, hasPassed: this.hasPassed })
        }, 10)
      }
      // Toggle Elevator calling
      this.toggleElevCalled(true)
      // Find out whether Eleavator has passed or not
      setTimeout(() => {
        this.ifPassedRequest({ floor: this.floor })
      }, 5)
    }
  }
}
</script>
