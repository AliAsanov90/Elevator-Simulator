<template>
  <span class="floor-indicator">
    {{ elevPosition }}
  </span>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState([
      'elevPosition'
    ])
  }
}
</script>
