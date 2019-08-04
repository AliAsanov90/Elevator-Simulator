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
      'elevPositionOnStop'
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
      // Add this new elevator call
      setTimeout(() => {
        this.addCurrentFloor({ floor: this.floor, hasPassed: this.hasPassed })
        // Log
        this.nextFloors.map(el => {
          console.log(`
            Floor: ${el.floor},
            Direction: ${el.direction},
            Passed: ${el.hasPassed}
          `)
        })
        console.log('.........................')
        // console.log(this.elevPosition)
      }, 10)
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
