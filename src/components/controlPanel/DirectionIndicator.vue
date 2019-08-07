<template>
  <div :class="direction">
    <span class="arrow-part-1">-</span>
    <span class="arrow-part-2">-</span>
    <span class="arrow-part-3">></span>
  </div>
</template>

<script>
export default {
  props: {
    direction: String
  },
  data() {
    return {
      arrowColor: '#00b894'
    }
  }
}
</script>
