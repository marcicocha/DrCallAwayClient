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
      <AppTitleDivider title="Bookings"
        ><span class="right-details"
          ><NuxtLink to="/admin/nurse/booking">View All ></NuxtLink></span
        ></AppTitleDivider
      >
      <AppBookingDataTable :data-source="allBooking" :pagination="false" />
    </div>
  </div>
</template>
<script>
import { Carousel, Slide } from 'vue-carousel'
import { mapActions, mapState } from 'vuex'
import AppDashboardCard from '@/components/AppDashboardCard'
import AppTitleDivider from '@/components/AppTitleDivider'
import AppBookingDataTable from '@/components/admin/nurse/AppBookingDataTable'

export default {
  components: {
    Carousel,
    Slide,
    AppDashboardCard,
    AppTitleDivider,
    AppBookingDataTable,
  },
  layout: 'dashboard',
  data() {
    return {
      dashboardList: [
        {
          firstText: 'My',
          secondText: 'Bookings',
          imgSrc: 'admin/ambulance/appointments.svg',
          color: '#641C62',
          path: '/admin/nurse/booking',
        },
      ],
    }
  },
  computed: {
    ...mapState({
      allBooking: (state) => state.bookingModule.bookingList,
    }),
  },
  async mounted() {
    try {
      await this.getAllBooking()
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
      getAllBooking: 'bookingModule/GET_BOOKING',
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
