<template>
  <v-col cols="12" sm="6" md="3">
    <v-text-field
      label="Enter message"
      outlined
      v-model="text"
      @keydown.enter="send"
    ></v-text-field>
  </v-col>
</template>

<script>
    export default {
        name: "ChatForm",
      data: () => ({
        text: ''
      }),
      methods: {
          send() {
            this.$socket.emit('createMessage', {
              text: this.text,
              id: this.$store.state.user.id
            }, data => {
              if (typeof data === 'string') {
                console.error(data)
              } else {
                this.text = ''
              }
            })
          }
      }
    }
</script>

<style scoped>

</style>
