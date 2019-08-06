<template>
  <div :class="direction">
    <!-- <div class="icon"> -->
    <!-- <div class="arrow" :style="{ backgroundColor: arrowColor }">
      <div class="arrow-before" :style="{ backgroundColor: arrowColor }"></div>
      <div class="arrow-after" :style="{ backgroundColor: arrowColor }"></div>
    </div> -->
    <!-- </div> -->
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
