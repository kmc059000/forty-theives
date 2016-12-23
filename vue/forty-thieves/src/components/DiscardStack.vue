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
    components: {
      Card
    },
    computed: {
      anyCards: function () {
        return this.$store.getters.discardStackAnyCards
      },
      card: function () {
        return this.$store.getters.discardStackTopCard
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
