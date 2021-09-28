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
    <AppConversation />
  </a-drawer>
</template>
<script>
import AppConversation from '@/components/AppConversation.vue'

export default {
  name: 'AppChatDrawer',
  props: {
    chatDrawerIsVisible: {
      type: Boolean,
      default: false,
    },
    doctor: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      default: 'patient',
    },
    currentCaseFile: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    AppConversation,
  },
  methods: {
    onClose() {
      this.$emit('onClose')
      // this.$echo.leave(`message.${this.currentCaseFile.patient_id}`)
    },
  },
}
</script>
