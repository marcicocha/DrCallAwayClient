<template>
  <div>
    <AppTabs v-model="activeKey">
      <template slot="default">
        <a-tab-pane key="1" tab="Pending Appointment" force-render>
          <AppAppointmentDataTable
            status="PENDING"
            @showAppointmentModal="showAppointmentModal"
          />
        </a-tab-pane>
        <a-tab-pane key="2" tab="Booked Appointment">
          <AppAppointmentDataTable
            status="BOOKED"
            @showAppointmentModal="showAppointmentModal"
          />
        </a-tab-pane>
        <a-tab-pane key="3" tab="Completed Appointment">
          <AppAppointmentDataTable
            status="COMPLETED"
            @showAppointmentModal="showAppointmentModal"
          />
        </a-tab-pane>
      </template>
      <template slot="rightInfo">
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
        />
      </div>
    </a-modal>
  </div>
</template>
<script>
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
    }
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
  },
}
</script>
<style lang="scss" scoped>
h6 {
  color: $dark-purple;
}
</style>
