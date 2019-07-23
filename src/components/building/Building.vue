<template>
  <div class="building">
    <Floor
      v-for="floor in reversedFloors"
      :key="floor"
      :floorNum="floor"
    />
    <Elevator />
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
  computed: {
    ...mapGetters([
      'reversedFloors'
    ])
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/sass/components/building/_building.scss';
</style>
