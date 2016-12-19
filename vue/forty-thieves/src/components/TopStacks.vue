<template>
  <div id="topPanel">
    <drop-stack v-for="(dropStack, index) in dropStacks" :stack="dropStack" :index="index">
    </drop-stack>
    <draw-stack></draw-stack>
    <discard-stack></draw-stack>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import DropStack from './DropStack'
  import DrawStack from './DrawStack'
  import DiscardStack from './DiscardStack'
  export default {
    name: 'top-stacks',
    components: {
      DrawStack,
      DiscardStack,
      DropStack
    },
    data () {
      return {
      }
    },
    computed: mapState([
      'drawStack',
      'discardStack',
      'dropStacks'
    ])
  }
</script>
<style scoped>

</style>
