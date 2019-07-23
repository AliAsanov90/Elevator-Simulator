<template>
  <div class="floor">
    <Doors />
    <CallButtons
      :floorNum="floorNum"
    />
  </div>
</template>

<script>
import Doors from './Doors'
import CallButtons from './CallButtons'

export default {
  components: {
    Doors,
    CallButtons
  },
  props: {
    floorNum: Number
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/sass/components/building/_floor.scss';
</style>
