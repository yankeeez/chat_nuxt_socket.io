<template>
  <h1>Chat page {{user.name}}</h1>
</template>

<script>
  import {mapState} from 'vuex'
    export default {
        name: "chat",
      computed: mapState(['user']),
      middleware: ['chat'],
      head() {
          return {
            title: `Room ${this.user.room}`
          }
      }
    }
</script>

<style scoped>

</style>
