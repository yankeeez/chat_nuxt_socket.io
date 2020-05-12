<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
    >
    <v-card min-width="400">
      <v-card-title>Nuxt chat</v-card-title>
      <v-card-text></v-card-text>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          v-model="name"
          :counter="10"
          :rules="nameRules"
          label="Name"
          required
        ></v-text-field>

        <v-text-field
          v-model="room"
          :rules="roomRules"
          label="Choose a room"
          required
        ></v-text-field>

        <v-btn
          :disabled="!valid"
          color="primary"
          class="mr-4"
          @click="submit"
        >
          Enter
        </v-btn>
      </v-form>
    </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import {mapMutations} from 'vuex'
import error from "../layouts/error";
export default {
  layout: 'empty',
  head: {
    title: 'Welcome to the Nuxt chat'
  },
  sockets: {
    connect: function () {
      console.log('Client IO connected')
    }
  },
  data: () => ({
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    room: '',
    roomRules: [
      v => !!v || 'Chooser a room',
    ],
  }),
  methods: {
    ...mapMutations(['setUser']),
    submit () {
      if (this.$refs.form.validate()) {
        const user = {
          name: this.name,
          room: this.room
        }

        this.$socket.emit('userJoined', user, data => {
          if (typeof data === 'string') {
            console.error(data)
          } else {
            user.id = data.userId
            this.setUser(user)
            this.$router.push("/chat")
          }
        })

        this.setUser(user)
        this.$router.push('/chat')
      }
    },
  },
}
</script>
