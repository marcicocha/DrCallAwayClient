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
      <AppTitleDivider title="Tests"
        ><span class="right-details"
          ><NuxtLink to="/admin/diagnostic-center/tests"
            >View All ></NuxtLink
          ></span
        ></AppTitleDivider
      >
      <AppTestDataTable :data-source="testDataSource" :pagination="false" />
    </div>
  </div>
</template>
<script>
import { Carousel, Slide } from 'vue-carousel'
import { mapActions, mapState } from 'vuex'
import AppDashboardCard from '@/components/AppDashboardCard'
import AppTitleDivider from '@/components/AppTitleDivider'
import AppTestDataTable from '@/components/admin/diagnostic-center/AppTestDataTable'

export default {
  components: {
    Carousel,
    Slide,
    AppDashboardCard,
    AppTitleDivider,
    AppTestDataTable,
  },
  layout: 'dashboard',
  data() {
    return {
      dashboardList: [
        {
          firstText: 'All',
          secondText: 'Tests',
          imgSrc: 'admin/ambulance/appointments.svg',
          color: '#641C62',
          path: '/admin/diagnostic-center/tests',
        },
      ],
    }
  },
  computed: {
    ...mapState({
      allTest: (state) => state.testDiagnosticModule.tests,
    }),
    testDataSource() {
      const newArray = this.allTest
        ? this.allTest.filter((rcd, i) => i < 5)
        : []
      return newArray
    },
  },
  async mounted() {
    try {
      await this.getAllTest()
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
      getAllTest: 'testDiagnosticModule/GET_TEST',
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
