<template>
  <div id="bottomPanel">
    <play-stack v-for="(playStack, index) in playStacks" :stack="playStack" :index="index" :key="index">
    </play-stack>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import PlayStack from '../stacks/PlayStack';

  export default {
    name: 'bottom-stacks',
    components: {
      PlayStack,
    },
    computed: {
      ...mapState(['playStacks']),
    },
  };
</script>
