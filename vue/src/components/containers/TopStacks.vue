<template>
  <div id="topPanel">
    <drop-stack v-for="(dropStack, index) in dropStacks" :stack="dropStack" :index="index" :key="index">
    </drop-stack>
    <draw-stack :stack="drawStack"></draw-stack>
    <discard-stack :stack="discardStack"></discard-stack>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import DropStack from '../stacks/DropStack'
  import DrawStack from '../stacks/DrawStack'
  import DiscardStack from '../stacks/DiscardStack'
  export default {
    name: 'top-stacks',
    components: {
      DrawStack,
      DiscardStack,
      DropStack
    },
    computed: mapState([
      'drawStack',
      'discardStack',
      'dropStacks'
    ])
  }
</script>
