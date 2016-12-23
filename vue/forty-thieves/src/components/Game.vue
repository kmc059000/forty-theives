<template>
  <div id="body">
      <actions></actions>
      <top-stacks></top-stacks>
      <bottom-stacks></bottom-stacks>
    </div>
</template>

<script>
import Messages from './Messages'
import Actions from './Actions'
import TopStacks from './TopStacks'
import BottomStacks from './BottomStacks'

export default {
  components: {
    Messages,
    Actions,
    TopStacks,
    BottomStacks
  },
  data () {
    return {
    }
  },
  created () {
    this.$store.commit('deal')
  }
}
</script>

<style>
  #body {
    margin-left: auto;
    margin-right: auto;
    width: 800px;
    height: 800px;
  }

  .dropStack, .dropStackFull, .dropStackFull, .drawStack, .discardStack, .cardStack {
    height: 104px;
    width: 70px;
    border: 1px solid black;
    float: left;
    margin: 3px;
    position: relative;
  }


  #topPanel, #bottomPanel {
    margin: 10px;
  }

</style>
