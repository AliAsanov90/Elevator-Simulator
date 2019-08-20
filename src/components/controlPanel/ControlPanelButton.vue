<template>
  <div>
    <button
      :class="{ 'active-button': highlightButton }"
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
      highlightButton: false,
      timeDoorClose: 4700,
      timeDefineHasPassed: 10,
      timeDefineElevOffset: 5,
      directionCalled: ''
    }
  },
  computed: {
    ...mapState([
      'prevFloor',
      'hasPassed',
      'elevPosition',
      'elevPositionOnStop',
      'isDoorClosed',
      'nextFloors',
      'direction',
      'elevStopped  '
    ])
  },
  watch: {
    elevPositionOnStop() {
      if (this.elevPositionOnStop === this.floor) {
        this.highlightButton = false
      }
    }
  },
  methods: {
    ...mapActions([
      'addCurrentFloor',
      'ifPassedRequest',
      'toggleElevCalled'
    ]),
    defineDirection() {
      this.directionCalled = this.floor >= this.elevPosition ? 'up' : 'down'
      if (this.floor === 1) this.directionCalled = 'up'
      if (this.floor === 5) this.directionCalled = 'down'
    },
    callElevator() {
      // this.toggleElevCalled(true)
      this.defineDirection()
      this.defineHasPassed()
      this.highlightButton = true
      if (this.elevStopped && (this.floor === this.elevPositionOnStop)) {
        this.toggleElevCalled(true)
        this.highlightButton = false
        return
      }
      if (!this.isDoorClosed) {
        this.addFloorAfterDoorClosed()
      } else {
        this.addFloor()
      }
      setTimeout(() => {
        this.nextFloors.map(el => {
          console.log(`
            Floor: ${el.floor},
            Direction: ${el.direction},
            hasPassed: ${el.hasPassed}
          `)
        })
        console.log(`..................`)
        console.log(`Elev Direction: ${this.direction}`)
      }, 20)
    },
    addFloorAfterDoorClosed() {
      setTimeout(() => {
        this.addCurrentFloor({
          floor: this.floor,
          direction: this.directionCalled,
          hasPassed: this.hasPassed
        })
      }, this.timeDoorClose)
    },
    addFloor() {
      setTimeout(() => {
        this.addCurrentFloor({
          floor: this.floor,
          direction: this.directionCalled,
          hasPassed: this.hasPassed
        })
      }, this.timeDefineHasPassed)
    },
    defineHasPassed() {
      setTimeout(() => {
        this.ifPassedRequest({
          floor: this.floor,
          direction: this.directionCalled
        })
      }, this.timeDefineElevOffset)
    }
  }
}
</script>
