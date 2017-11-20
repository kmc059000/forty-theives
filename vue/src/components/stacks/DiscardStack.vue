<template>
  <div>
    <div :class="{'discardStack': true, 'selectedCard' : this.stack.selected }"
        @click="select">
        <card v-if="anyCards" :card="card">
        </card>
    </div>
  </div>
</template>

<script>
  import Card from './Card'

  export default {
    components: {
      Card
    },
    props: ['stack'],
    computed: {
      anyCards: function () {
        return !!this.stack.length
      },
      card: function () {
        return this.$store.getters.discardStackTopCard
      }
    },
    methods: {
      select () {
        this.$store.dispatch('selectDiscardStack')
      }
    }
  }
</script>
