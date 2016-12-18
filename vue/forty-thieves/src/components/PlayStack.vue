<template>
  <div class="cardStack">
    <div @click="select">
        <card v-for="(card, index) in cards" :card="card" :index="index">
        </card>
    </div>
  </div>
</template>

<script>
  import Card from './Card'

  export default {
    props: ['stack', 'index'],
    data () {
      return {
      }
    },
    components: {
      Card
    },
    computed: {
      anyCards: function () {
        return this.stack.anyCards()
      },
      cards: function () {
        return this.stack.cards()
      }
    },
    methods: {
      select () {
        this.$store.dispatch('selectPlayStack', this.index)
      }
    }
  }
</script>
<style scoped>

</style>
