<template>
  <div class="dropStack" @click="select">
    <card v-if="anyCards" :card="card">
    </card>
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
      card: function () {
        return this.stack.topCard()
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
