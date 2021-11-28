<template>
  <div>
    <AppTitleDivider title="All Notifications" />
    <div
      v-for="notification in notificationList"
      :key="notification.id"
      class="notification__container"
    >
      <div
        v-if="notification.data.message"
        class="notification__container-message"
      >
        <img src="@/assets/images/admin/notification.png" />
        <span>{{ notification.data.message }}</span>
      </div>
      <div class="notification__container-time">
        {{ convertDate(notification.data.time) }}
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import AppTitleDivider from '@/components/AppTitleDivider'

export default {
  components: {
    AppTitleDivider,
  },
  layout: 'dashboard',
  data() {
    const userObject = JSON.parse(localStorage.getItem('user'))
    const config = {
      headers: { Authorization: `Bearer ${userObject.token.token}` },
    }
    return {
      notificationList: [],
      config,
    }
  },
  async mounted() {
    try {
      const { data } = await this.$axios.get('/notifications', this.config)
      const newArray = data.data
      this.notificationList = newArray.data
      // console.log(this.notificationList, 'NOTIFICATION LIST')
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
  methods: {
    convertDate(date) {
      return moment(date).fromNow()
    },
  },
}
</script>
<style lang="scss" scoped>
.notification {
  &__container {
    display: flex;
    justify-content: space-between;
    background: white;
    border: 1px solid #b871b3;
    border-radius: 5px;
    padding: 1rem 2rem;
    margin-bottom: 1.25rem;
    &-message {
      color: #3d0c3c;
      img {
        width: 30px;
        height: 30px;
        object-fit: contain;
        margin-right: 2rem;
      }
    }
    &-time {
      color: #3d0c3c;
      font-weight: bold;
    }
  }
}
</style>
