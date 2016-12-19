<template>
  <div id="topPanel">
    <drop-stack v-for="(dropStack, index) in dropStacks" :stack="dropStack" :index="index">
    </drop-stack>
    <draw-pile></draw-pile>
    <discard-pile></draw-pile>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import DropStack from './DropStack'
  import DrawPile from './DrawPile'
  import DiscardPile from './DiscardPile'
  export default {
    name: 'top-stacks',
    components: {
      DrawPile,
      DiscardPile,
      DropStack
    },
    data () {
      return {
      }
    },
    computed: mapState([
      'drawPile',
      'discardPile',
      'dropStacks'
    ])
  }
</script>
<style scoped>

</style>
