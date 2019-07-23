<template>
  <div id="app">
    <ControlPanel />
    <Building />
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

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  #app {
    margin: 0 100px;
    margin-top: 30px;
  }
</style>
