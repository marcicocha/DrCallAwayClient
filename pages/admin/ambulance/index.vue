<template>
  <div>
    <carousel
      :pagination-enabled="false"
      :per-page-custom="[
        [320, 1],
        [640, 2],
        [1024, 3],
        [1400, 3],
      ]"
      class="dashboard__carousel"
      :scroll-per-page="true"
    >
      <slide v-for="(item, i) in dashboardList" :key="i" class="slide">
        <AppDashboardCard
          :card-obj="item"
          :color="item.color"
          @click="$router.replace(item.path)"
        />
      </slide>
    </carousel>

    <br />

    <div>
      <AppTitleDivider title="Pending Requests"
        ><span class="right-details"
          ><NuxtLink to="/admin/ambulance/callup">View All ></NuxtLink></span
        ></AppTitleDivider
      >
      <AppCallUpDataTable
        :data-source="callUpDataSource"
        :pagination="false"
        dashboard
      />
    </div>
  </div>
</template>
<script>
import { Carousel, Slide } from 'vue-carousel'
import { mapActions, mapState } from 'vuex'
import AppDashboardCard from '@/components/AppDashboardCard'
import AppTitleDivider from '@/components/AppTitleDivider'
import AppCallUpDataTable from '@/components/admin/ambulance/AppCallUpDataTable'

export default {
  components: {
    Carousel,
    Slide,
    AppDashboardCard,
    AppTitleDivider,
    AppCallUpDataTable,
  },
  layout: 'dashboard',
  data() {
    return {
      dashboardList: [
        {
          firstText: 'Call-Up',
          secondText: 'Requests',
          imgSrc: 'admin/ambulance/appointments.svg',
          color: '#641C62',
          path: '/admin/ambulance/callup',
        },
      ],
    }
  },
  computed: {
    ...mapState({
      allCallUp: (state) => state.callUpModule.callUpList,
    }),
    callUpDataSource() {
      const newArray = this.allCallUp
        ? this.allCallUp.filter((rcd, i) => i < 5)
        : []
      return newArray
    },
  },
  async mounted() {
    try {
      const obj = {
        status: 'PENDING',
      }
      await this.getAllCallUp(obj)
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
      getAllCallUp: 'callUpModule/GET_CALL_UP',
    }),
  },
}
</script>
<style lang="scss" scoped>
.blue {
  color: #0031a5;
}
.green {
  color: #2ec114;
}
.slide {
  border-radius: 10px;
  flex-shrink: 0;
  @include breakpoint-up(large) {
    padding-right: 1.5rem;
  }
}
</style>
