<template>
  <div class="dropStack" @click="select">
    <card v-if="card" :card="card">
    </card>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import Card from './Card';
  import { topCard } from '../../store/helpers';

  export default {
    props: ['stack', 'index'],
    components: {
      Card,
    },
    computed: {
      card() {
        return topCard(this.stack);
      },
    },
    methods: {
      ...mapActions(['selectDropStack']),
      select() {
        this.selectDropStack(this.index);
      },
    },
  };
</script>
