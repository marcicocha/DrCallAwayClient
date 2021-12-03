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
    <a style="position: relative" @click="notificationHandler">
      <img
        src="@/assets/images/notification.svg"
        alt="notification"
        :class="{ notification: true, 'new-notification': isNewNotification }"
      />
      <span v-if="isNewNotification" class="notification_span">*</span>
    </a>
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
import Pusher from 'pusher-js'
import AppButton from '@/components/AppButton'
// require('dotenv').config()
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
      isNewNotification: false,
    }
  },
  mounted() {
    // Pusher.log = function (message) {
    //   console.log(message, 'MESSAGE')
    // }
    const pusher = new Pusher(process.env.PUSHER_APP_KEY, {
      key: process.env.PUSHER_APP_KEY,
      cluster: process.env.PUSHER_APP_CLUSTER,
      secret: process.env.PUSHER_APP_SECRET,
      app_id: process.env.PUSHER_APP_ID,
    })
    const channel = pusher.subscribe(`NotificationEvent.${this.userObject.id}`)
    channel.bind('App\\Events\\NotificationEvent', (data) => {
      if (data) {
        this.isNewNotification = true
      }
      // this.notificationList.push(data)
      // console.log(this.notificationList, 'NOTIFICATION LIST')
    })
  },
  methods: {
    subscribeHandler() {
      this.$router.replace('/admin/self-service/subscribe')
    },
    notificationHandler() {
      this.$router.replace('/admin/notification')
      this.isNewNotification = false
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
    &_span {
      position: absolute;
      left: 57%;
      color: red;
    }
  }
  .new-notification {
    position: relative;
    content: '*';
    animation: shake 1000ms ease-in-out infinite forwards;
    &::before {
      content: '*';
      position: absolute;
      color: red;
      width: 10px;
      height: 10px;
    }
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
