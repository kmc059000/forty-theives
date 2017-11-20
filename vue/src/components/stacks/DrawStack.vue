<template>
  <div>
    <div :class="{'drawStack': true, 'cardBack': this.anyCards, 'selectedCard' : this.stack.selected }"
        @click="drawCard"></div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    props: ['stack'],
    computed: {
      anyCards() {
        return !!this.stack.length;
      },
    },
    methods: {
      ...mapActions(['drawCard']),
    },
  };
</script>
<style scoped>
  .cardBack {
      background-color: Black;
  }
</style>
