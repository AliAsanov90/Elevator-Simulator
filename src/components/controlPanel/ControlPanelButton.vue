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

// Javascript
<script>
export default {
  props: {
    floor: Number
  }
}
</script>

// CSS styling
<style scoped>
  .button {
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 50%;
    font-size: 16px;
    font-weight: bold;
  }

  .active-button {
    background-color: yellow;
  }
</style>
