<template>
  <div id="app">
    <ControlPanel />
    <Building />
    <div class="ground"></div>
  </div>
</template>

<script>
import Building from './components/building/Building.vue'
import ControlPanel from './components/controlPanel/ControlPanel.vue'

export default {
  name: 'app',
  components: {
    Building,
    ControlPanel
  }
}
</script>

<style lang="scss" scoped>
  @import './assets/sass/components/_app.scss';
</style>
