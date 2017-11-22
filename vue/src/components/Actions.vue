<template>
  <div>
    <div id="buttonPanel">

      <button @click="newGame">New Game</button>
      <button @click="undo">Undo</button>

      <span id="lblInfo">
        Time: {{elapsedMins}}:{{elapsedSecs}} Score: {{score}}
      </span>

      <label>
        Difficulty:
        <select v-model="difficulty" :disabled="!canChangeSettings">
          <option value="4">4 suits</option>
          <option value="2">Colors</option>
          <option value="1">Any Card</option>
        </select>
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
      cycleDiscards: false,
    };
  },
  computed: {
    difficulty: {
      get() {
        return this.$store.state.difficulty;
      },
      set(val) {
        this.$store.dispatch('setSuitMode', val);
      },
    },
    ...mapState([
      'score',
      'startTime',
    ]),
    ...mapGetters(['canChangeSettings']),
  },
  methods: {
    ...mapActions({
      deal: 'deal',
      undo: 'undo',
    }),
    newGame() {
      // eslint-disable-next-line no-alert
      if (window.confirm('Are you sure you want to start a new game?')) {
        this.deal();
      }
    },
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
