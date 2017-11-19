<template>
  <div>
    <div :class="{'drawStack': true, 'cardBack': this.anyCards, 'selectedCard' : this.drawStack.selected }"
        @click="drawCard"></div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  export default {
    computed: {
      anyCards: function () {
        return this.$store.getters.drawStackAnyCards
      },
      ...mapState([
        'drawStack'
      ])
    },
    methods: {
      ...mapActions(['drawCard'])
    }
  }
</script>
<style scoped>
  .cardBack {
      background-color: Black;
  }
</style>
