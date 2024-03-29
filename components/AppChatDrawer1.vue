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
    <div class="chat-container">
      <div
        v-for="(msg, i) in messageList"
        :key="i"
        :class="{
          'message-section': true,
          'message-out': msg.isSender,
          'message-in': !msg.isSender,
        }"
      >
        <span>{{ msg.body }}</span>
      </div>
    </div>
    <div class="chat-input">
      <AppInput v-model="message" style="width: 94%" />
      <AppButton
        class="send-button"
        icon="arrow-right"
        size="default"
        @click="sendMessageHandler"
      />
    </div>
  </a-drawer>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import AppInput from '@/components/AppInput'
import AppButton from '@/components/AppButton'
export default {
  name: 'AppChatDrawer',
  components: {
    AppInput,
    AppButton,
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
      message: '',
      user,
    }
  },
  computed: {
    messageList() {
      if (this.allMessage) {
        const newArray = this.allMessage.map((rcd) => {
          if (rcd.sender_id === this.user.id) {
            return { ...rcd, isSender: true }
          } else {
            return { ...rcd, isSender: false }
          }
        })
        return [...newArray]
      }
      return []
    },
    ...mapState({
      allMessage: (state) => state.messageModule.messageList,
    }),
  },
  watch: {
    chatDrawerIsVisible: {
      handler(newVal, oldVal) {
        if (newVal) {
          // this.$echo
          //   .private(`message.${this.currentCaseFile.id}`)
          //   .listen('MessageSent', (e) => {
          //     console.log(e, '::: mounted ::')
          //   })
        }
      },
      immediate: true,
    },
  },
  methods: {
    onClose() {
      this.$emit('onClose')
      this.resetMessageHandler()
    },
    async sendMessageHandler() {
      if (!this.message) {
        return
      }
      try {
        const obj = {
          body: this.message,
          case_id: this.currentCaseFile.id,
        }
        await this.submitMessageHandler(obj)
        this.message = ''
      } catch (err) {
        const { default: errorHandler } = await import('@/utils/errorHandler')
        errorHandler(err).forEach((msg) => {
          this.$notification.error({
            message: 'Error',
            description: msg,
            duration: 4000,
          })
        })
      }
    },
    ...mapActions({
      submitMessageHandler: 'messageModule/POST_MESSAGE',
      resetMessageHandler: 'messageModule/RESET_MESSAGE',
    }),
  },
}
</script>
<style lang="scss" scoped>
.send-button {
  width: 5%;
  font-size: 1.2rem;
  //   color: $dark-purple;
}
.chat-container {
  height: 94%;
  padding: 0.8rem 0;
}
.chat-input {
  position: relative;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.message-section {
  //   width: fit-content;
  //   height: auto;
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
  span {
    color: white;
    padding: 5px 16px;
    border-radius: 7.5px;
    max-width: 60%;
    position: relative;
    overflow-wrap: break-word;
    white-space: pre-wrap;
    box-shadow: 0 2px 4.5px rgba(0, 0, 0, 0.18);
  }
}
.message-out {
  align-items: flex-end;
  span {
    background: $medium-purple;
  }
}
.message-in {
  align-items: flex-start;
  span {
    background: $medium-light;
  }
}
</style>
