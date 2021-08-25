<template>
  <div>
    <AppTabs v-model="activeKey" @tabClick="changeTabHandler">
      <template slot="default">
        <a-tab-pane key="1" tab="Pending Appointment" force-render>
          <AppAppointmentDataTable
            :data-source="allAppointments"
            @showAppointmentModal="showAppointmentModal"
          />
        </a-tab-pane>
        <a-tab-pane key="2" tab="Booked Appointment">
          <AppAppointmentDataTable
            :data-source="allAppointments"
            @showAppointmentModal="showAppointmentModal"
          />
        </a-tab-pane>
        <a-tab-pane key="3" tab="Completed Appointment">
          <AppAppointmentDataTable
            :data-source="allAppointments"
            @showAppointmentModal="showAppointmentModal"
          />
        </a-tab-pane>
      </template>
      <template v-if="false" slot="rightInfo">
        <a-row type="flex" :gutter="16" class="right-info">
          <a-col :span="12">
            <AppSelect
              v-model="filterObj.filterKey"
              placeholder="Select filter option"
              :data="['YES']"
              class="filter"
              :remote="true"
            />
          </a-col>
          <a-col :span="12">
            <AppInput
              v-model="filterObj.filterValue"
              placeholder="Search"
              class="filter"
              name="value"
            />
          </a-col>
        </a-row>
      </template>
    </AppTabs>
    <a-modal
      :visible="modalIsVisible"
      width="420px"
      :confirm-loading="confirmLoading"
      :footer="null"
      :destroy-on-close="true"
      :mask-style="{ background: 'rgba(61, 12, 60, 0.9)' }"
      centered
      @cancel="closeModal"
    >
      <div>
        <h6 class="t-c">Medical Checkup</h6>
        <a-divider />
        <AppAppointmentCreationForm
          :current-appointment="currentAppointment"
          status="patient"
          @formSubmissionCompleted="closeModal"
        />
      </div>
    </a-modal>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import AppTabs from '@/components/AppTabs'
import AppInput from '@/components/AppInput'
import AppSelect from '@/components/AppSelect'
import AppAppointmentDataTable from '@/components/admin/patient/appointment/AppAppointmentDataTable.vue'
import AppAppointmentCreationForm from '@/components/admin/patient/appointment/AppAppointmentCreationForm'

export default {
  components: {
    AppTabs,
    AppInput,
    AppSelect,
    AppAppointmentDataTable,
    AppAppointmentCreationForm,
  },
  layout: 'dashboard',
  data() {
    return {
      activeKey: '1',
      filterObj: {},
      modalIsVisible: false,
      currentAppointment: {},
      confirmLoading: false,
      status: 'PENDING',
    }
  },
  computed: {
    ...mapState({
      allAppointments: (state) => state.appointmentModule.appointments,
    }),
  },
  mounted() {
    this.changeTabHandler('1')
  },
  methods: {
    showAppointmentModal(record) {
      console.log(record, 'RECORD')
      this.currentAppointment = record
      this.modalIsVisible = true
    },
    closeModal() {
      this.modalIsVisible = false
    },
    async changeTabHandler(key) {
      if (key === '1') {
        this.status = 'PENDING'
      }
      if (key === '2') {
        this.status = 'BOOKED'
      }
      if (key === '3') {
        this.status = 'COMPLETED'
      }
      try {
        const obj = {
          ...this.filterObj,
          status: this.status,
        }
        await this.getAllAppointment(obj)
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
    ...mapActions({
      getAllAppointment: 'appointmentModule/GET_APPOINTMENT',
    }),
  },
}
</script>
<style lang="scss" scoped>
h6 {
  color: $dark-purple;
}
</style>
