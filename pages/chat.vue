<template>
  <div>
    <h1>Chat page {{user.name}}</h1>
    <ul>
      <li v-for="m in messages" :key="m.text">
        {{m.text}}
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
    export default {
        name: "chat",
      computed: mapState(['user', 'messages']),
      middleware: ['chat'],
      head() {
          return {
            title: `Room ${this.user.room}`
          }
      },
    }
</script>

<style scoped>

</style>
