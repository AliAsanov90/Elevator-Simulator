<template>
  <div class="floor">
    <Doors :floorNum="floorNum" />
    <CallButtons :floorNum="floorNum" />
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
