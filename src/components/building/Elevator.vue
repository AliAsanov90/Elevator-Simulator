<template>
  <div
    class="elevator"
    :style="{
      bottom: (startFloor - 1) + '00px',
      transition: ((startFloor - 1) * 2) + 's'
    }"
  >
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState([
      'startFloor'
    ])
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/sass/components/building/_elevator.scss';
</style>
