<template>
  <div>
    <div :class="{'drawPile': true, 'cardBack': this.anyCards, 'selectedCard' : this.drawPile.selected }"
        @click="select"></div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    props: ['drawPile'],
    data () {
      return {
      }
    },
    computed: {
      anyCards: function () {
        // return false
        return this.drawPile.anyCards()
      },
      ...mapState([
        'drawPile'
      ])
    },
    methods: {
      select () {
        this.$store.dispatch('selectDrawPile')
      }
    }
  }
</script>
<style scoped>

</style>
