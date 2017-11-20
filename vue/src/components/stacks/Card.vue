<template>
  <div :class="suitClasses" :style="{'top': offset}">
      <div :class="numberClasses">
        <card-number :card="card" class="tl"></card-number>
        <card-number :card="card" class="tr"></card-number>
        <card-number :card="card" class="bl"></card-number>
        <card-number :card="card" class="br"></card-number>
      </div>
    </div>
</template>

<script>
  import CardNumber from './CardNumber';

  export default {
    name: 'card',
    components: {
      CardNumber,
    },
    props: ['card', 'index'],
    computed: {
      suit() {
        return this.card && this.card.cardSuit;
      },
      number() {
        return this.card && this.card.cardNumber;
      },
      suitClasses() {
        return {
          card: true,
          selectedCard: this.card.selected,
          [this.suit]: true,
        };
      },
      numberClasses() {
        return {
          cardsize: true,
          [`_${this.number}`]: true,
        };
      },
      offset() {
        return `${(this.index * 25)}px`;
      },
    },
  };
</script>
<style scoped>

  .card, .cardBack {
      height: 102px;
      width: 68px;
      float: left;
      border: 1px solid black;
  }

  .cardsize {
      height: 102px;
      width: 68px;
      float: left;
  }

  .selectedCard {
      border: 4px solid Aqua;
  }

  .card {
      background-color: White;
      position: absolute;
      background-color: White;
      background-image: url(/static/sprite.png);
      background-repeat: no-repeat;
  }

  .H {
      background-position: -144px 0px;
  }

  .S {
    background-position: 0px 0px;
  }

  .D {
      background-position: -72px 0px;
  }

  .C {
      background-position: -216px 0px;
  }

  .tl {
    position: absolute;
    top: 2px;
    left: 2px;
  }

  .tr {
    position: absolute;
    top: 2px;
    right: 2px;
  }

  .bl {
    position: absolute;
    bottom: 2px;
    left: 2px;
  }

  .br {
    position: absolute;
    bottom: 2px;
    right: 2px;
  }
</style>
