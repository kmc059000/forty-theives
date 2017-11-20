<template>
  <div id="body">
      <actions></actions>
      <top-stacks></top-stacks>
      <bottom-stacks></bottom-stacks>
    </div>
</template>

<script>
import Actions from './Actions';
import TopStacks from './containers/TopStacks';
import BottomStacks from './containers/BottomStacks';

export default {
  components: {
    Actions,
    TopStacks,
    BottomStacks,
  },
  created() {
    this.$store.dispatch('deal');
  },
};
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
