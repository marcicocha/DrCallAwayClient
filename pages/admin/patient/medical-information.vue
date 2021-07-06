<template>
  <div class="admin-wrapper">
    <AppHealthInformationForm :health-info-obj="healthInfo" />
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'

import AppHealthInformationForm from '@/components/admin/AppHealthInformationForm'
export default {
  components: {
    AppHealthInformationForm,
  },
  layout: 'dashboard',
  computed: {
    ...mapState({
      healthInfo: (state) => state.healthInformationModule.healthInfoObj,
    }),
  },
  async mounted() {
    try {
      await this.getHealthHandler()
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
    ...mapActions({
      getHealthHandler: 'healthInformationModule/GET_HEALTH_INFORMATION',
    }),
  },
}
</script>
