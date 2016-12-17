<template>
  <ul id="infoList">
    <li v-for="msg in messages">
      {{msg}}
    </li>
  </ul>
</template>

<script>
export default {
  data () {
    return {
      messages: [
        'Added undo ability.'
      ]
    }
  }
}
</script>
<style scoped>

</style>
