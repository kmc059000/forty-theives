<template>
  <div class="number">{{number}}</div>
</template>

<script>
  const faceCards = {
    1: 'A',
    11: 'J',
    12: 'Q',
    13: 'K',
  };

  export default {
    name: 'CardNumbe',
    props: ['card'],
    computed: {
      number() {
        return this.card && (faceCards[this.card.cardNumber] || this.card.cardNumber);
      },
    },
  };
</script>
<style scoped>
  .number {
    color: black;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-size: 14px;
  }
</style>
