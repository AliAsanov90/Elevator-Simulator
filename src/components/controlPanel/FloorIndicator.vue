<template>
  <div>
    <span class="floor-indicator">
      {{ elevPosition }}
    </span>
  </div>
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
