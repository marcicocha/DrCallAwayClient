<template>
  <a-drawer
    :title="doctor"
    width="60%"
    placement="right"
    :closable="true"
    :visible="chatDrawerIsVisible"
    class="chat-drawer"
    @close="$emit('onClose')"
  >
    <div class="chat-container">
      <div class="message-section message-out">
        <span class="sender">this is a test</span>
      </div>
      <div class="message-section message-in">
        <span class="reciever">hi, i am marcia </span>
      </div>
      <div class="message-section message-out">
        <span class="sender">this is a test </span>
      </div>
      <div class="message-section message-in">
        <span class="reciever">hi, i am marcia</span>
      </div>
    </div>
    <div class="chat-input">
      <AppInput v-model="message" style="width: 94%" />
      <a-icon type="arrow-right" class="send-button" />
    </div>
  </a-drawer>
</template>
<script>
import AppInput from '@/components/AppInput'
export default {
  name: 'AppChatDrawer',
  components: {
    AppInput,
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
  },
  data() {
    return {
      message: '',
    }
  },
}
</script>
<style lang="scss" scoped>
.send-button {
  width: 5%;
  font-size: 1.5rem;
  color: $dark-purple;
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
