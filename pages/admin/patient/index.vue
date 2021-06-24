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
        <AppDashboardCard :card-obj="item" :color="item.color" />
      </slide>
    </carousel>

    <br />

    <div>
      <AppTitleDivider title="Case File"
        ><span class="right-details"
          ><NuxtLink to="/admin/patient/case-file">View All ></NuxtLink></span
        ></AppTitleDivider
      >
      <a-table
        :columns="columns"
        :data-source="allCaseFiles"
        :pagination="false"
      >
        <template slot="status" slot-scope="text, record">
          <div
            :class="{
              blue: record.status === 'Active',
              green: record.status === 'Completed',
            }"
          >
            {{ record.status }}
          </div>
        </template>
      </a-table>
    </div>
    <br />
    <div>
      <AppTitleDivider title="Appointments">
        <span class="right-details"
          ><NuxtLink to="/admin/patient/appointment">View All ></NuxtLink></span
        >
      </AppTitleDivider>
      <a-table
        :columns="columns"
        :data-source="allAppointments"
        :pagination="false"
      >
        <template slot="status" slot-scope="text, record">
          <div class="t-r">
            {{ record.status }}
          </div>
        </template>
      </a-table>
    </div>
  </div>
</template>
<script>
import { Carousel, Slide } from 'vue-carousel'
import { mapActions, mapState } from 'vuex'

import AppDashboardCard from '@/components/AppDashboardCard'
import AppTitleDivider from '@/components/AppTitleDivider'

export default {
  components: {
    Carousel,
    Slide,
    AppDashboardCard,
    AppTitleDivider,
  },
  layout: 'dashboard',
  data() {
    return {
      dashboardList: [
        {
          firstText: 'Talk to a',
          secondText: 'DOCTOR',
          imgSrc: 'admin/patient/1.png',
          color: '#641C62',
        },
        {
          firstText: 'Request a',
          secondText: 'Service',
          imgSrc: 'admin/patient/2.png',
          color: '#BB58B6',
        },
        {
          firstText: 'Case',
          secondText: 'File',
          imgSrc: 'admin/patient/3.png',
          color: '#3D0C3C',
        },
      ],
    }
  },
  computed: {
    columns() {
      const columns = [
        {
          title: 'Case ID',
          dataIndex: 'caseId',
          scopedSlots: { customRender: 'caseId' },
        },
        {
          title: 'Consultant Name',
          dataIndex: 'consultantName',
          scopedSlots: { customRender: 'consultantName' },
        },
        {
          title: 'Complaint',
          dataIndex: 'complaint',
          scopedSlots: { customRender: 'complaint' },
        },
        {
          title: 'Date Added',
          dataIndex: 'dateAdded',
          scopedSlots: { customRender: 'dateAdded' },
        },
        {
          title: 'Status',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' },
        },
        // {
        //  title: '',
        //  dataIndex: 'operation1',
        //  scopedSlots: { customRender: 'operation' },
        // },
      ]
      return columns
    },
    ...mapState({
      allCaseFiles: (state) => state.caseFileModule.caseFiles,
      allAppointments: (state) => state.appointmentModule.appointments,
    }),
  },
  async mounted() {
    try {
      await this.getAllCaseFile()
      await this.getAllAppointment()
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
      getAllCaseFile: 'caseFileModule/GET_CASE_FILE',
      getAllAppointment: 'appointmentModule/GET_APPOINTMENT',
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
