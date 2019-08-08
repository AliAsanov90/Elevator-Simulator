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
      timeDefineElevOffset: 5
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
      this.stopHighlightButton()
    }
  },
  methods: {
    ...mapActions([
      'addCurrentFloor',
      'ifPassedRequest',
      'toggleElevCalled'
    ]),
    stopHighlightButton() {
      if (this.elevPositionOnStop === this.floor) {
        this.highlightButton = false
      }
    },
    callElevator() {
      this.toggleElevCalled(true)
      this.defineHasPassed()
      this.highlightButton = true
      if ((this.floor === 1) && (this.prevFloor.floor === 1) && (this.elevPosition === 1)) {
        this.openFirstFloor()
        return
      }
      if (!this.isDoorClosed && (this.elevPosition === 1)) {
        this.addFloorAfterDoorClosed()
      } else {
        this.addFloor()
      }
    },
    openFirstFloor() {
      this.toggleElevCalled(true)
      this.highlightButton = false
    },
    addFloorAfterDoorClosed() {
      setTimeout(() => {
        this.addCurrentFloor({ floor: this.floor, hasPassed: this.hasPassed })
      }, this.timeDoorClose)
    },
    addFloor() {
      setTimeout(() => {
        this.addCurrentFloor({ floor: this.floor, hasPassed: this.hasPassed })
      }, this.timeDefineHasPassed)
    },
    defineHasPassed() {
      setTimeout(() => {
        this.ifPassedRequest({ floor: this.floor })
      }, this.timeDefineElevOffset)
    }
  }
}
</script>
