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
          ><NuxtLink to="/admin/doctor/case-file">View All ></NuxtLink></span
        ></AppTitleDivider
      >
      <AppCaseFileDataTable :data-source="allCaseFiles" :pagination="false" />
    </div>
    <br />
    <div>
      <AppTitleDivider title="Appointments">
        <span class="right-details"
          ><NuxtLink to="/admin/doctor/appointment">View All ></NuxtLink></span
        >
      </AppTitleDivider>
      <AppAppointmentDataTable
        :data-source="allAppointments"
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
import AppCaseFileDataTable from '@/components/admin/patient/case-file/AppCaseFileDataTable.vue'
import AppAppointmentDataTable from '@/components/admin/doctor/appointment/AppAppointmentDataTable'

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
      dataSource: [
        {
          caseId: '#000001',
          patientName: 'Dr. Michael Sanwo-Olu',
          complaint: 'Malaria and Typhoid',
          dateAdded: '23rd March, 2021',
          status: 'Active',
        },
        {
          caseId: '#000002',
          patientName: 'Dr. Michael Sanwo-Olu',
          complaint: 'Malaria and Typhoid',
          dateAdded: '23rd March, 2021',
          status: 'Completed',
        },
      ],
      dataSource1: [],
      dashboardList: [
        {
          firstText: 'Waiting',
          secondText: 'ROOM',
          imgSrc: 'admin/doctor/1.png',
          color: '#641C62',
          path: '/admin/doctor/waiting-room',
        },
        {
          firstText: 'View',
          secondText: 'APPOINTMENTS',
          imgSrc: 'admin/patient/2.png',
          color: '#BB58B6',
          path: '/admin/doctor/appointment',
        },
        {
          firstText: 'Case',
          secondText: 'MANAGEMENT',
          imgSrc: 'admin/patient/3.png',
          color: '#3D0C3C',
          path: '/admin/doctor/case-management',
        },
      ],
    }
  },
  computed: {
    ...mapState({
      allAppointments: (state) => state.appointmentDoctorModule.appointments,
      allCaseFiles: (state) => state.caseFileDoctorModule.caseFiles,
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
      getAllAppointment: 'appointmentDoctorModule/GET_APPOINTMENT',
      getAllCaseFile: 'caseFileDoctorModule/GET_DOCTOR_CASE_FILE',
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
