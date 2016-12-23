<template>
  <div>
    <div :class="{'drawStack': true, 'cardBack': this.anyCards, 'selectedCard' : this.drawStack.selected }"
        @click="select"></div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
      }
    },
    computed: {
      anyCards: function () {
        return this.$store.getters.drawStackAnyCards
      },
      ...mapState([
        'drawStack'
      ])
    },
    methods: {
      select () {
        this.$store.dispatch('drawCard')
      }
    }
  }
</script>
<style scoped>

</style>
