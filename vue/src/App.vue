<template>
  <div id="app">
    <game></game>
  </div>
</template>

<script>
import store from './store/index';
import Game from './components/Game';

export default {
  name: 'app',
  store,
  components: {
    Game,
  },
};
</script>

<style>
body {
    background-color: Green;
	  color: White;
}
</style>
