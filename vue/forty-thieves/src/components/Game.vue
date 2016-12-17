<template>
  <div id="wrapper"> 
		<div id="left">
      <messages></messages>
    </div>
		<div id="body">
      <actions :score="score"></actions>
      <!--<top-stacks></top-stacks>
      <bottom-stacks></bottom-stacks>-->
    </div>
		<div id="right">
		</div>
</template>

<script>
import Messages from './Messages'
import Actions from './Actions'

export default {
  components: {
    Messages,
    Actions
  },
  data () {
    return {
      score: 0
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  #wrapper
  {
    margin-left: auto;
      margin-right: auto;
      width: 1100px;
  }

  #left, #right
  {
    height: 800px;
    width: 150px;
    float: left;
    color: white;
  }

  #body
  {
    margin-left: auto;
      margin-right: auto;
      width: 800px;
      height: 800px;
    float: left;
  }

</style>
