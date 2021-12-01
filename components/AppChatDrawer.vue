<template>
  <a-drawer
    :title="doctor"
    width="60%"
    placement="right"
    :closable="true"
    :visible="chatDrawerIsVisible"
    class="chat-drawer"
    @close="onClose"
  >
    <chat-window
      :current-user-id="currentUserId"
      :rooms="rooms"
      :messages="messages"
    />
  </a-drawer>
</template>

<script>
import ChatWindow from 'vue-advanced-chat'
import 'vue-advanced-chat/dist/vue-advanced-chat.css'

export default {
  components: {
    ChatWindow,
  },
  props: {
    chatDrawerIsVisible: {
      type: Boolean,
      default: false,
    },
    doctor: {
      type: String,
      default: '',
    },
    currentCaseFile: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    const user = JSON.parse(localStorage.getItem('user'))

    return {
      rooms: [],
      messages: [],
      currentUserId: 1234,
      user,
    }
  },
}
</script>
