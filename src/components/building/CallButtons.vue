<template>
  <div class="call-buttons">
    <button
      class="arrow-up"
      :class="{ 'clicked-up': clickedUp }"
      v-if="floorNum !== 5"
      @click="callElevator('up')"
    >
    </button>

    <button
      class="arrow-down"
      :class="{ 'clicked-down': clickedDown }"
      v-if="floorNum !== 1"
      @click="callElevator('down')"
    >
    </button>
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
      clickedUp: false,
      clickedDown: false
    }
  },
  computed: {
    ...mapState([
      'prevFloor',
      'hasPassed',
      'elevPositionOnStop',
      'elevPosition',
      'isDoorClosed'
    ])
  },
  watch: {
    elevPositionOnStop() {
      // Stop highlighting button when elev arrives to THIS floor
      if (this.elevPositionOnStop === this.floorNum) {
        this.clickedUp = false
        this.clickedDown = false
      }
    }
  },
  methods: {
    ...mapActions([
      'addCurrentFloor',
      'ifPassedRequest',
      'toggleElevCalled'
    ]),
    callElevator(direction) {
      // Highlight the right button - Up or Down
      direction === 'up' ? this.clickedUp = true : this.clickedDown = true
      // If elevator is on the 1st floor and button on the 1st floor was called
      if ((this.floorNum === 1) && (this.prevFloor.floor === 1) && (this.elevPosition === 1)) {
        // Open the doors by notifying that elev was called
        this.toggleElevCalled(true)
        // Don't highlight the button because elev is already here
        this.clickedUp = false
        return // No need to add this 1st floor to the Request Order, just open doors
      }
      // If elev is on 1st floor and doors are not closed
      if (!this.isDoorClosed && (this.elevPosition === 1)) {
        // Wait almost 5 sec until doors are closed, and then add next floor,
        // so that elev doesn't go away when doors are still open
        setTimeout(() => {
          this.addCurrentFloor({ direction, floor: this.floorNum, hasPassed: this.hasPassed })
        }, 4700)
      } else {
        // Just add next floors in other cases
        setTimeout(() => {
          this.addCurrentFloor({ direction, floor: this.floorNum, hasPassed: this.hasPassed })
        }, 10)
      }
      // Change state so that elev sends its current position
      this.toggleElevCalled(true)
      // Find out if elev has passed THIS floor
      setTimeout(() => {
        this.ifPassedRequest({ floor: this.floorNum })
      }, 5)
    }
  }
}
</script>
