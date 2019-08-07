<template>
  <div class="building">
    <Floor
      v-for="floor in reversedFloors"
      :key="floor"
      :floorNum="floor"
      @elevCalled="getElevPos"
    />
    <Elevator
      @updated="onUpdated"
      ref="elevator"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Floor from './Floor'
import Elevator from './Elevator'

export default {
  components: {
    Floor,
    Elevator
  },
  data() {
    return {
      pos: null
    }
  },
  computed: {
    ...mapGetters([
      'reversedFloors'
    ])
  },
  methods: {
    onUpdated(value) {
      this.pos = 4
    },
    getElevPos() {
      this.$refs.elevator.updateElevPostition()
    }
  }
}
</script>
