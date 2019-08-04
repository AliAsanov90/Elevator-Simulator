<template>
  <div class="doors">
    <div class="door" :class="{ 'door-opened': elevStopped }"></div>
    <div class="door" :class="{ 'door-opened': elevStopped }"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

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
      'nextFloors'
    ])
  },
  watch: {
    elevPositionOnStop() {
      if (this.floorNum === this.elevPositionOnStop) {
        this.elevStopped = true
        setTimeout(() => {
          this.elevStopped = false
        }, 4000)
      }
      if (this.nextFloors[0].direction === '') {
        this.elevStopped = false
      }
    }
  }
}
</script>
