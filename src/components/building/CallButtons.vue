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
      'nextFloors',
      'prevFloor',
      'direction',
      'hasPassed',
      'elevPositionOnStop',
      'elevPosition',
      'isDoorClosed'
    ])
  },
  watch: {
    elevPositionOnStop() {
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
      'addNewFloor',
      'toggleElevCalled',
      'getElevPositionOnStop',
      'removeFloor'
    ]),
    callElevator(direction) {
      direction === 'up' ? this.clickedUp = true : this.clickedDown = true
      // If elevator is on 1st floor and button of 1st floor was called
      if ((this.floorNum === 1) && (this.prevFloor.floor === 1) && (this.elevPosition === 1)) {
        this.toggleElevCalled(true)
        this.clickedUp = false
        return
      }

      if (!this.isDoorClosed) {
        setTimeout(() => {
          this.addCurrentFloor({ direction, floor: this.floorNum, hasPassed: this.hasPassed })
          this.nextFloors.map(el => {
            console.log(`
              Floor: ${el.floor},
              Direction: ${el.direction},
              Passed: ${el.hasPassed}
            `)
          })
          console.log('.........................')
        }, 4700)
        // return
      } else {
        setTimeout(() => {
          this.addCurrentFloor({ direction, floor: this.floorNum, hasPassed: this.hasPassed })
          this.nextFloors.map(el => {
            console.log(`
              Floor: ${el.floor},
              Direction: ${el.direction},
              Passed: ${el.hasPassed}
            `)
          })
          console.log('.........................')
        }, 10)
      }
      this.toggleElevCalled(true)
      setTimeout(() => {
        this.ifPassedRequest({ floor: this.floorNum })
      }, 5)
    }
  }
}
</script>
