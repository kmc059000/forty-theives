<template>
  <div id="wrapper">
		<div id="left">
      <messages></messages>
    </div>
		<div id="body">
      <actions></actions>
      <top-stacks></top-stacks>
      <bottom-stacks></bottom-stacks>
    </div>
		<div id="right">
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
  .dropZone, .dropZoneFull, .dropZoneFull, .drawPile, .discardPile, .cardStack
{
    height: 104px;
    width: 70px;
    border: 1px solid black;
    float: left;
}

.card, .cardBack
{
    height: 102px;
    width: 68px;
    float: left;
    border: 1px solid black;
}

.cardsize
{
    height: 102px;
    width: 68px;
    float: left;
}

.selectedCard
{
    border: 4px solid Aqua;
}

.dropZone, .dropZoneFull, .dropZoneFull, .drawPile, .discardPile, .cardStack
{
    margin: 3px;
    position: relative;
}

.dropZone
{
}

.dropZoneFull
{
}

.dropZoneFull
{
}


.card
{
    background-color: White;
    position: absolute;
    background-color: White;
    background-image: url(/assets/sprite.png);
    background-repeat: no-repeat;
}

.cardBack
{
    background-color: Black;
}

#infoPanel
{
	display: none;
}

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

#topPanel
{
    width: 800px;
    height: 112px;
    margin: 10px;
}

#bottomPanel
{
    width: 800px;
    height: 112px;
    margin: 10px;
}

#buttonPanel
{
    margin-left: 10px;
}

._1, ._2, ._3, ._4, ._5, ._6, ._7, ._8, ._9, ._10, ._11, ._12, ._13
{
    background-image: url(/sprite.png);
}

.H
{
    background-position: -144px 0px;
}
.S
{
}
.D
{
    background-position: -72px 0px;
}
.C
{
    background-position: -216px 0px;
}

._1
{
    background-position: -288px 0px;
}
._2
{
    background-position: -360px 0px;
}
._3
{
    background-position: -432px 0px;
}
._4
{
    background-position: -504px 0px;
}
._5
{
    background-position: -576px 0px;
}
._6
{
    background-position: -648px 0px;
}
._7
{
    background-position: -720px 0px;
}
._8
{
    background-position: -792px 0px;
}
._9
{
    background-position: -864px 0px;
}
._10
{
    background-position: -940px 0px;
}
._11
{
    background-position: -1012px 0px;
}
._12
{
    background-position: -1084px 0px;
}
._13
{
    background-position: -1156px 0px;
}

</style>
