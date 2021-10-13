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
    <AppConversation
      :current-case-file="currentCaseFile"
      :status="status"
      :doctor="doctor"
    />
  </a-drawer>
</template>
<script>
import AppConversation from '~/components/AppConversation.vue'

export default {
  name: 'AppChatDrawer',
  components: {
    AppConversation,
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
    status: {
      type: String,
      default: 'patient',
    },
    currentCaseFile: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    onClose() {
      this.$emit('onClose')
      // this.$echo.leave(`message.${this.currentCaseFile.patient_id}`)
    },
  },
}
</script>
