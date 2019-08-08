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
      this.clicked = true
      if ((this.floor === 1) && (this.prevFloor.floor === 1) && (this.elevPosition === 1)) {
        this.toggleElevCalled(true)
        this.clicked = false
        return
      }
      if (!this.isDoorClosed && (this.elevPosition === 1)) {
        setTimeout(() => {
          this.addCurrentFloor({ floor: this.floor, hasPassed: this.hasPassed })
        }, 4700)
      } else {
        setTimeout(() => {
          this.addCurrentFloor({ floor: this.floor, hasPassed: this.hasPassed })
        }, 10)
      }
      this.toggleElevCalled(true)
      setTimeout(() => {
        this.ifPassedRequest({ floor: this.floor })
      }, 5)
    }
  }
}
</script>
