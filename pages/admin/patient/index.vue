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
      <AppTitleDivider title="Case File"
        ><span class="right-details"
          ><NuxtLink to="/admin/patient/case-file">View All ></NuxtLink></span
        ></AppTitleDivider
      >
      <AppCaseFileDataTable
        :data-source="caseDataSource"
        :pagination="false"
        :columns="columns"
      />
    </div>
    <br />
    <div>
      <AppTitleDivider title="Appointments">
        <span class="right-details"
          ><NuxtLink to="/admin/patient/appointment">View All ></NuxtLink></span
        >
      </AppTitleDivider>
      <AppAppointmentDataTable
        :data-source="appointmentDataSource"
        :pagination="false"
      />
    </div>
  </div>
</template>
<script>
import { Carousel, Slide } from 'vue-carousel'
import { mapActions, mapState } from 'vuex'
import AppDashboardCard from '@/components/AppDashboardCard'
import AppTitleDivider from '@/components/AppTitleDivider'
import AppCaseFileDataTable from '@/components/admin/patient/case-file/AppCaseFileDataTable'
import AppAppointmentDataTable from '@/components/admin/patient/appointment/AppAppointmentDataTable'
export default {
  components: {
    Carousel,
    Slide,
    AppDashboardCard,
    AppTitleDivider,
    AppCaseFileDataTable,
    AppAppointmentDataTable,
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
          path: '/admin/patient/key-services/consultation',
        },
        {
          firstText: 'Request a',
          secondText: 'Service',
          imgSrc: 'admin/patient/2.png',
          color: '#BB58B6',
          path: '/admin/patient/key-services/consultation',
        },
        {
          firstText: 'Case',
          secondText: 'File',
          imgSrc: 'admin/patient/3.png',
          color: '#3D0C3C',
          path: '/admin/patient/case-file',
        },
      ],
    }
  },
  computed: {
    columns() {
      const columns = [
        {
          title: 'Case ID',
          dataIndex: 'id',
          scopedSlots: { customRender: 'id' },
        },
        {
          title: 'Consultant Name',
          dataIndex: 'doctor',
          scopedSlots: { customRender: 'doctor' },
        },
        {
          title: 'Complaint',
          dataIndex: 'initial_complain',
          scopedSlots: { customRender: 'initial_complain' },
        },
        {
          title: 'Date Added',
          dataIndex: 'created_at',
          scopedSlots: { customRender: 'date' },
        },
        {
          title: 'Status',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' },
        },
      ]
      return columns
    },
    ...mapState({
      allAppointments: (state) => state.appointmentModule.appointments,
      allCaseFiles: (state) => state.caseFileModule.caseFiles,
    }),
    caseDataSource() {
      const newArray = this.allCaseFiles
        ? this.allCaseFiles.filter((rcd, i) => i < 5)
        : []
      return newArray
    },
    appointmentDataSource() {
      const newArray = this.allAppointments
        ? this.allAppointments.filter((rcd, i) => i < 5)
        : []
      return newArray
    },
  },
  async mounted() {
    try {
      this.getAllCaseFile()
      this.getAllAppointment()
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
  destroyed() {
    this.resetHandler()
  },
  methods: {
    ...mapActions({
      getAllAppointment: 'appointmentModule/GET_APPOINTMENT',
      getAllCaseFile: 'caseFileModule/GET_CASE_FILE',
      resetHandler: 'caseFileModule/RESET_CASE_FILE',
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
