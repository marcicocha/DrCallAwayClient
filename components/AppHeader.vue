<template>
  <div class="header-menu">
    <AppButton
      v-if="role === 'patient'"
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
    <p style="text-transform: capitalize">
      {{
        userObject.registered_name
          ? `${userObject.registered_name}`
          : `${userObject.first_name} ${userObject.last_name}`
      }}
    </p>
    <nuxt-link to="/admin/profile">
      <img src="@/assets/images/user.png" alt="user-icon" class="user" />
    </nuxt-link>
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
  data() {
    const userObject = JSON.parse(localStorage.getItem('user'))
    return {
      userObject,
      role: userObject.roles[0].name,
    }
  },

  methods: {
    subscribeHandler() {
      this.$router.replace('/admin/self-service/subscribe')
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
