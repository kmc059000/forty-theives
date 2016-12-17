<template>
  <div id="app">
    <game></game>
  </div>
</template>

<script>
import Game from './components/Game'

export default {
  name: 'app',
  components: {
    Game
  }
}
</script>

<style>
body {
    background-color: Green;
	  color: White;
}
</style>
