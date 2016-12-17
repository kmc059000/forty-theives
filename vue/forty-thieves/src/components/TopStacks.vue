<template>
  <div id="topPanel">
    <div class="dropZone" id="d0"></div>
    <div class="dropZone" id="d1"></div>
    <div class="dropZone" id="d2"></div>
    <div class="dropZone" id="d3"></div>
    <div class="dropZone" id="d4"></div>
    <div class="dropZone" id="d5"></div>
    <div class="dropZone" id="d6"></div>
    <div class="dropZone" id="d7"></div>
    <draw-pile :stack="drawPile"></draw-pile>
    <div class="discardPile"></div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import DrawPile from './DrawPile'
  export default {
    name: 'top-stacks',
    components: {
      DrawPile
    },
    data () {
      return {
      }
    },
    computed: mapState([
      'drawPile'
    ])
  }
</script>
<style scoped>

</style>
