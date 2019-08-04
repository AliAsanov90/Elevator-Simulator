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
      'elevPositionOnStop'
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
      'toggleElevCalled'
      // 'defineDirection'
    ]),
    callElevator(direction) {
      direction === 'up' ? this.clickedUp = true : this.clickedDown = true
      // Add this new elevator call
      setTimeout(() => {
        // console.log(this.hasPassed)
        this.addCurrentFloor({ direction, floor: this.floorNum, hasPassed: this.hasPassed })
        this.nextFloors.map(el => {
          console.log(`
            Floor: ${el.floor},
            Direction: ${el.direction},
            Passed: ${el.hasPassed}
          `)
        })
        // console.log(this.direction)
        console.log('.........................')
      }, 10)
      // setTimeout(() => {
      // }, 50)
      // Get time at which elevator was called
      // setTimeout(() => {
      //   const now = new Date().getSeconds()
      //   this.ifPassedRequest({ яtime: now, floor: tяhis.floorNuяm })
      // }, 200)
      this.toggleElevCalled(true)
      setTimeout(() => {
        this.ifPassedRequest({ floor: this.floorNum })
      }, 5)
      // this.defineDirection()
    }
  }
}
</script>
