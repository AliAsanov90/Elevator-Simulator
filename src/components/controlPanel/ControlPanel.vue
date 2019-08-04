<template>
  <div class="panel">
    <div class="indicators">
      <FloorIndicator />
      <DirectionIndicator direction="up" v-if="direction === 'up'" />
      <DirectionIndicator direction="down" v-if="direction === 'down'" />
    </div>

    <div class="control-panel">
      <ul class="control-buttons">
        <li
          v-for="(floor, index) in reversedFloors"
          :key="index"
          class="control-button"
        >
          <ControlPanelButton :floor="floor">
            {{ floor }}
          </ControlPanelButton>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import FloorIndicator from './FloorIndicator.vue'
import ControlPanelButton from './ControlPanelButton.vue'
import DirectionIndicator from './DirectionIndicator.vue'

export default {
  components: {
    FloorIndicator,
    ControlPanelButton,
    DirectionIndicator
  },
  data() {
    return {}
  },
  computed: {
    ...mapState([
      'direction'
    ]),
    ...mapGetters([
      'reversedFloors'
    ])
  }
}
</script>
