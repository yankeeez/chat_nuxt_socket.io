<template>
  <div class="c-wrap">
    <div class="c-chat">
      <Message v-for="m in messages"
               :key="m.text"
               :name="m.name"
               :text="m.text"
               :owner="m.id === user.id"
      ></Message>
    </div>
    <div class="c-form">
      <ChatForm></ChatForm>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import Message from "../components/Message"
  import ChatForm from "../components/ChatForm"
    export default {
        name: "chat",
      computed: mapState(['user', 'messages']),
      components: {ChatForm, Message},
      middleware: ['chat'],
      head() {
          return {
            title: `Room ${this.user.room}`
          }
      },
    }
</script>

<style scoped>
  .c-wrap {
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  .c-form {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    height: 80px;
    background: #212121;
  }

  .c-chat {
    position: absolute;
    bottom: 80px;
    top: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    overflow-y: auto;
  }
</style>
