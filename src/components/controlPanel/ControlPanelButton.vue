<template>
  <div>
    <button
      :class="floor === 4 ? 'active-button' : ''"
      class="button"
      type="button"
    >
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    floor: Number
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/sass/components/controlPanel/_control-panel-button.scss';
</style>
