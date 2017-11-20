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
  import { mapActions, mapGetters } from 'vuex';
  import Card from './Card';

  export default {
    components: {
      Card,
    },
    props: ['stack'],
    computed: {
      anyCards() {
        return !!this.stack.length;
      },
      ...mapGetters({
        card: 'discardStackTopCard',
      }),
    },
    methods: {
      ...mapActions({
        select: 'selectDiscardStack',
      }),
    },
  };
</script>
