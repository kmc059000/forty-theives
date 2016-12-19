<template>
  <div class="dropStack">
    <div @click="select">
        <card v-if="anyCards" :card="card">
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
        this.$store.dispatch('selectDropStack', this.index)
      }
    }
  }
</script>
<style scoped>

</style>
