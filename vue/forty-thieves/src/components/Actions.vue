<template>
  <div>
    <div id="buttonPanel">
      <button @click="newGame">New Game</button>
      <button @click="undo">Undo</button>
      <button @click="showInfo">Show Info</button>

      <span id="lblInfo">
        Time: {{elapsedMins}}:{{elapsedSecs}} Score: {{score}}
      </span>
    </div>

    <div id="infoPanel">
      <button id="btnViewLog">Refresh Log</button>
      <ul id='log'>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      elapsedMins: 0,
      elapsedSecs: 0
    }
  },
  computed: mapState([
    'score',
    'startTime'
  ]),
  methods: {
    newGame () {
      this.$store.commit('deal')
    },
    undo () {
      console.info('undo')
    },
    showInfo () {
      console.info('show info')
    },
    updateStatus () {
      let seconds = 1000
      let minutes = seconds * 60

      if (!this.startTime || !this.startTime.getTime) {
        return
      }

      let elapsed = new Date().getTime() - this.startTime.getTime()
      this.elapsedMins = Math.floor(elapsed / minutes)
      this.elapsedSecs = Math.floor((elapsed / seconds) % 60)

      if (this.elapsedSecs < 10) {
        this.elapsedSecs = '0' + this.elapsedSecs
      }
    }
  },
  created () {
    setInterval(this.updateStatus.bind(this), 100)
  }
}
</script>
<style scoped>


#infoPanel
{
	display: none;
}
#topPanel
{
    width: 800px;
    height: 112px;
    margin: 10px;
}


#buttonPanel
{
    margin-left: 10px;
}

</style>
