<template>
  <div>
    <div :class="{'discardPile': true, 'selectedCard' : this.discardPile.selected }"
        @click="select">
        <div v-if="anyCards" :class="suitClasses">
          <div :class="numberClasses"></div>
        </div>
    </div>
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
        return this.discardPile.anyCards()
      },
      suitClasses: function () {
        var card = this.discardPile.topCard()

        var obj = {
          card: true
        }

        if (card) {
          obj[card.cardSuit] = true
        }

        return obj
      },
      numberClasses: function () {
        var card = this.discardPile.topCard()

        var obj = {
          cardsize: true
        }

        if (card) {
          obj['_' + card.cardNumber] = true
        }

        return obj
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
