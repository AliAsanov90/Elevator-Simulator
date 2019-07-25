<template>
  <div class="call-buttons">
    <button
      class="arrow-up"
      :class="{ clicked: clicked }"
      v-if="floorNum !== 5"
      @click="callElevator('up')"
    >
    </button>

    <button
      class="arrow-down"
      v-if="floorNum !== 1"
      @click="callElevator('down')"
    >
    </button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: {
    floorNum: Number
  },
  data() {
    return {
      clicked: false
    }
  },
  computed: {
    ...mapState([
      'nextFloors',
      'prevFloor',
      'direction'
    ])
  },
  methods: {
    ...mapActions([
      'addCurrentFloor'
      // 'defineDirection'
    ]),
    callElevator(direction) {
      this.addCurrentFloor({ direction, floor: this.floorNum })
      // console.log(this.nextFloors.map(el => el.floor))
      // console.log(this.floorNum)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/sass/components/building/_callButtons.scss';
</style>
