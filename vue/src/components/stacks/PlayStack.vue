<template>
  <div class="cardStack" @click="select" @dblclick="autoMove">
    <div>
        <card v-for="(card, index) in cards" :card="card" :index="index" :key="`card-${card.cardSuit}-${card.cardNumber}`">
        </card>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import Card from './Card';

  export default {
    props: ['stack', 'index'],
    components: {
      Card,
    },
    computed: {
      cards() {
        return this.stack;
      },
    },
    methods: {
      ...mapActions(['selectPlayStack', 'autoMovePlayStack']),
      select() {
        this.selectPlayStack(this.index);
      },
      autoMove() {
        this.autoMovePlayStack(this.index);
      },
    },
  };
</script>
