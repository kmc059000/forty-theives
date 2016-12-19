<template>
  <div :class="suitClasses" :style="{'top': offset}">
      <div :class="numberClasses">
      </div>
    </div>
</template>

<script>
  export default {
    name: 'card',
    props: ['card', 'index'],
    data () {
      return {
      }
    },
    computed: {
      suitClasses: function () {
        var obj = {
          card: true,
          'selectedCard': this.card.selected
        }

        if (this.card) {
          obj[this.card.cardSuit] = true
        }

        return obj
      },
      numberClasses: function () {
        var obj = {
          cardsize: true
        }

        if (this.card) {
          obj['_' + this.card.cardNumber] = true
        }

        return obj
      },
      offset: function () {
        return (this.index * 25) + 'px'
      }
    }
  }
</script>
<style scoped>

</style>
