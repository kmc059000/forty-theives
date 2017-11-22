<template>
  <div>
    <div id="buttonPanel">

      <button @click="newGame">New Game</button>
      <button @click="undo">Undo</button>

      <span id="lblInfo">
        Time: {{elapsedMins}}:{{elapsedSecs}} Score: {{score}}
      </span>

      <label>
        2 Suits:
        <input type="checkbox" v-model="twoSuitMode" :disabled="!canChangeSettings" />
      </label>

      <label>
        Cycle Discards:
        <input type="checkbox" v-model="cycleDiscards" :disabled="!canChangeSettings" />
      </label>
    </div>

  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';

export default {
  data() {
    return {
      elapsedMins: 0,
      elapsedSecs: 0,
      twoSuitMode: false,
      cycleDiscards: false,
    };
  },
  computed: {
    ...mapState([
      'score',
      'startTime',
    ]),
    ...mapGetters(['canChangeSettings']),
  },
  methods: {
    ...mapActions({
      newGame: 'deal',
      undo: 'undo',
    }),
    updateStatus() {
      const seconds = 1000;
      const minutes = seconds * 60;

      if (!this.startTime || !this.startTime.getTime) {
        return;
      }

      const elapsed = new Date().getTime() - this.startTime.getTime();
      this.elapsedMins = Math.floor(elapsed / minutes);
      this.elapsedSecs = Math.floor((elapsed / seconds) % 60);

      if (this.elapsedSecs < 10) {
        this.elapsedSecs = `0${this.elapsedSecs}`;
      }
    },
  },
  created() {
    setInterval(this.updateStatus, 1000);
  },
  watch: {
    twoSuitMode(val) {
      this.$store.dispatch('setMode', val ? 2 : 4);
    },
    cycleDiscards(val) {
      this.$store.dispatch('setCycleMode', !!val);
    },
  },
};
</script>
<style scoped>

#infoPanel {
	display: none;
}

#topPanel {
    width: 800px;
    height: 112px;
    margin: 10px;
}

#buttonPanel {
    margin-left: 10px;
}

label {
  margin-left: 1rem;
}

</style>
