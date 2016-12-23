<template>
  <div class="dropStack" @click="select">
    <card v-if="anyCards" :card="card">
    </card>
  </div>
</template>

<script>
  import Card from './Card'
  import * as helpers from '../store/helpers'

  export default {
    props: ['stack', 'index'],
    components: {
      Card
    },
    computed: {
      anyCards: function () {
        return helpers.anyCards(this.stack)
      },
      card: function () {
        return helpers.topCard(this.stack)
      }
    },
    methods: {
      select () {
        this.$store.dispatch('selectDropStack', this.index)
      }
    }
  }
</script>
