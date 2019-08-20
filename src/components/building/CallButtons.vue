<template>
  <div class="call-buttons">
    <button
      class="arrow-up"
      :class="{ 'clicked-up': clickedUp }"
      v-if="floorNum !== 5"
      @click="callElevator('up')"
    >
    </button>

    <button
      class="arrow-down"
      :class="{ 'clicked-down': clickedDown }"
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
      clickedUp: false,
      clickedDown: false,
      timeDoorClose: 4700,
      timeDefineHasPassed: 10,
      timeDefineElevOffset: 5
    }
  },
  computed: {
    ...mapState([
      'prevFloor',
      'hasPassed',
      'elevPositionOnStop',
      'elevPosition',
      'isDoorClosed',
      'nextFloors',
      'direction',
      'elevStopped'
    ])
  },
  watch: {
    elevPositionOnStop() {
      if (this.elevPositionOnStop === this.floorNum) {
        if (this.floorNum === 1) this.clickedUp = false
        if (this.floorNum === 5) this.clickedDown = false
        if ((this.nextFloors.filter(el => el.floor === this.floorNum).length > 1) &&
          (this.nextFloors[0].floor !== this.nextFloors[1].floor)) {
          this.direction === 'up' ? this.clickedUp = false : this.clickedDown = false
        } else {
          this.clickedUp = false
          this.clickedDown = false
        }
      }
    }
    // nextFloors() {
    //   if (this.prevFloor.floor === this.nextFloors[0].floor) {
    //     console.log(`i'm here!!!!!!!!!!!!!!!!!!!!`)
    //     this.removeFloor(this.nextFloors[0])
    //   }
    // }
  },
  methods: {
    ...mapActions([
      'addCurrentFloor',
      'ifPassedRequest',
      'toggleElevCalled',
      'defineDirection',
      'removeFloor'
    ]),
    callElevator(direction) {
      // this.toggleElevCalled(true)
      this.defineDirection()
      this.defineHasPassed(direction)
      this.highlightButton(direction)
      if (this.elevStopped && (this.floorNum === this.elevPositionOnStop)) {
        this.toggleElevCalled(true)
        direction === 'up' ? this.clickedUp = false : this.clickedDown = false
        return
      }
      if (!this.isDoorClosed) {
        this.addFloorAfterDoorClosed(direction)
      } else {
        this.addFloor(direction)
      }
      setTimeout(() => {
        this.nextFloors.map(el => {
          console.log(`
            Floor: ${el.floor},
            Direction: ${el.direction},
            hasPassed: ${el.hasPassed}
          `)
        })
        console.log(`..................`)
        console.log(`Elev Position: ${this.elevPosition}`)
        console.log(`ElevPositionOnStop: ${this.elevPositionOnStop}`)
        console.log(`Elev Stopped: ${this.elevStopped}`)
        // console.log(`Elev Direction: ${this.direction}`)
      }, 20)
    },
    highlightButton(direction) {
      direction === 'up' ? this.clickedUp = true : this.clickedDown = true
    },
    addFloorAfterDoorClosed(direction) {
      setTimeout(() => {
        this.addCurrentFloor({
          direction,
          floor: this.floorNum,
          hasPassed: this.hasPassed
        })
      }, this.timeDoorClose)
    },
    addFloor(direction) {
      setTimeout(() => {
        this.addCurrentFloor({
          direction,
          floor: this.floorNum,
          hasPassed: this.hasPassed
        })
      }, this.timeDefineHasPassed)
    },
    defineHasPassed(direction) {
      setTimeout(() => {
        this.ifPassedRequest({
          floor: this.floorNum,
          direction
        })
      }, this.timeDefineElevOffset)
    }
  }
}
</script>
