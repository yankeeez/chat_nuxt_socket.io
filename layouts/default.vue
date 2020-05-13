<template>
  <v-app app dark>
    <v-navigation-drawer app v-model="drawer" mobile-break-point="650"> <!-- need to refactor: mess with drawer better use simple div or table -->
      <v-list subheader>
        <v-subheader>Recent chat</v-subheader>

        <v-list-item
          v-for="user in users"
          :key="user.id"
          @click.prevent="true"
        >
          <v-list-item-content>
            <v-list-item-title>{{user.name}}</v-list-item-title>
          </v-list-item-content>

          <v-list-item-icon>
            <v-icon :color="user.id === 2 ? 'deep-purple accent-4' : 'grey'">chat_bubble</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dense>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-btn icon @click="exit">
        Exit
      </v-btn>
      <v-toolbar-title>Room {{user.room}}</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <div style="height: 100%">
        <nuxt />
      </div>
    </v-content>
  </v-app>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
export default {
  data: () => ({
    drawer: false,
    users: [
      {id: 1, name: 'user 1'},
      {id: 2, name: 'user 2'},
    ]
  }),
  computed: mapState(['user']),
  methods: {
    ...mapMutations(['clearData']),
    exit() {
      this.$router.push('/?message=leftChat')
      this.clearData()
    }
  }
}
</script>
