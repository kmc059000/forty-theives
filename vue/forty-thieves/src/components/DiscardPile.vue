<template>
  <div>
    <div :class="{'discardPile': true, 'selectedCard' : this.discardPile.selected }"
        @click="select">
        <card v-if="anyCards" :card="card">
        </card>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Card from './Card'

  export default {
    data () {
      return {
      }
    },
    components: {
      Card
    },
    computed: {
      anyCards: function () {
        return this.discardPile.anyCards()
      },
      card: function () {
        return this.discardPile.topCard()
      },
      ...mapState([
        'discardPile'
      ])
    },
    methods: {
      select () {
        this.$store.dispatch('selectDiscardPile')
      }
    }
  }
</script>
<style scoped>

</style>
