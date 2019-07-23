<template>
  <div class="panel">
    <FloorIndicator />

    <div class="control-panel">
      <ul class="control-buttons">
        <li
          v-for="(floor, index) in reversedFloors"
          :key="index"
          class="control-button"
        >
          <ControlPanelButton
            :floor="floor"
          >
            {{ floor }}
          </ControlPanelButton>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FloorIndicator from './FloorIndicator.vue'
import ControlPanelButton from './ControlPanelButton.vue'

export default {
  components: {
    FloorIndicator,
    ControlPanelButton
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'reversedFloors'
    ])
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/sass/components/controlPanel/_control-panel.scss';
</style>
