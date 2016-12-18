<template>
  <div id="bottomPanel">
    <play-stack v-for="(playStack, index) in playStacks" :stack="playStack" :index="index">
    </play-stack>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import PlayStack from './PlayStack'
  export default {
    name: 'bottom-stacks',
    components: {
      PlayStack
    },
    data () {
      return {
      }
    },
    computed: {
      ...mapState(['playStacks'])
    }
  }
</script>
<style scoped>

</style>
