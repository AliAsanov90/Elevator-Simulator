<template>
  <div :class="direction">
    <div class="icon">
      <div class="arrow" :style="{ backgroundColor: arrowColor }">
        <div class="arrow-before" :style="{ backgroundColor: arrowColor }"></div>
        <div class="arrow-after" :style="{ backgroundColor: arrowColor }"></div>
      </div>
    </div>
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
