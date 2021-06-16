<template>
  <div class="header-menu">
    <AppButton
      type="primary"
      :block="false"
      class="admin-button"
      @click="subscribeHandler"
      >Subscribe</AppButton
    >
    <img
      src="@/assets/images/notification.svg"
      alt="notification"
      class="notification"
    />
    <p>Abraham Lincoln</p>
    <img src="@/assets/images/user.png" alt="user-icon" class="user" />
  </div>
</template>
<script>
import AppButton from '@/components/AppButton'

export default {
  name: 'AppHeader',
  components: {
    AppButton,
  },
  props: {
    minified: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    subscribeHandler() {
      console.log('CLICKED')
    },
  },
}
</script>
<style lang="scss" scoped>
.header-menu {
  display: flex;
  align-items: center;
  .admin-button {
    font-size: 14px;
    padding: 0 1rem;
  }
  .notification {
    width: 44px;
    height: 44px;
    object-fit: none;
    margin: 0 30px;
  }
  .user {
    width: 40px;
    height: 40px;
    object-fit: cover;
    margin-left: 30px;
  }
  p {
    margin-bottom: 0;
  }
}
//   .menu__header {
//   width: 100%;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 0.875rem 0;
//   border-bottom: 1px solid rgba(80, 90, 71, 0.59);
// }
</style>
