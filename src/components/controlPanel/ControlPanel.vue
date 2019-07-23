<template>
  <div>
    <FloorIndicator />

    <div class="control-panel">
      <ul class="control-buttons">
        <li
          v-for="(floor, index) in floors"
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
import FloorIndicator from './FloorIndicator.vue'
import ControlPanelButton from './ControlPanelButton.vue'

export default {
  components: {
    FloorIndicator,
    ControlPanelButton
  },
  data() {
    return {
      floors: [1, 2, 3, 4, 5].reverse()
    }
  }
}
</script>

<style scoped>
  .control-panel {
    width: 140px;
    height: 200px;
    border: 1px solid gray;
    margin-top: 50px;
    padding: 10px;
  }

  .control-buttons {
    height: 100%;
    display: flex;
    flex-direction: row-reverse;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: stretch;
    list-style: none;
  }

  .control-buttons li:first-child {
    flex-basis: 100%;
    justify-content: flex-start;
    margin-left: 10px;
  }

  .control-button {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
