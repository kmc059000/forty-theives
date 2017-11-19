<template>
  <div class="cardStack">
    <div @click="select">
        <card v-for="(card, index) in cards" :card="card" :index="index" :key="`card-${card.cardSuit}-${card.cardNumber}`">
        </card>
    </div>
  </div>
</template>

<script>
  import Card from './Card'
  import * as helpers from '../../store/helpers'

  export default {
    props: ['stack', 'index'],
    components: {
      Card
    },
    computed: {
      anyCards () {
        return helpers.anyCards(this.stack)
      },
      cards () {
        return this.stack
      }
    },
    methods: {
      select () {
        this.$store.dispatch('selectPlayStack', this.index)
      }
    }
  }
</script>
