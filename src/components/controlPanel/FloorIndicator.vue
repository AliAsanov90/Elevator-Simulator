<template>
  <span class="floor-indicator">
    {{ elevPosition }}
  </span>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      currentFloor: this.elevPosition
    }
  },
  computed: {
    ...mapState([
      'elevPosition'
    ])
  }
}
</script>
