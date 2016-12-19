<template>
  <div>
    <div :class="{'discardStack': true, 'selectedCard' : this.discardStack.selected }"
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
        return this.discardStack.anyCards()
      },
      card: function () {
        return this.discardStack.topCard()
      },
      ...mapState([
        'discardStack'
      ])
    },
    methods: {
      select () {
        this.$store.dispatch('selectDiscardStack')
      }
    }
  }
</script>
<style scoped>

</style>
