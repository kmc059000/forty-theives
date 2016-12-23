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
    data () {
      return {
      }
    },
    components: {
      Card
    },
    computed: {
      anyCards: function () {
        return helpers.anyCards(this.stack)
      },
      card: function () {

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
