<template>
  <div>
    <h6>PRECRIPTIONS</h6>
    <AppTabs v-model="activeKey">
      <template slot="default">
        <a-tab-pane key="1" tab="Pending Prescription" force-render>
          <AppPrescriptionDataTable
            status="PENDING"
            :filterObj="filterObj"
            @showPrescriptionModal="showPrescriptionModal"
          />
        </a-tab-pane>

        <a-tab-pane key="2" tab="Completed Prescription">
          <AppPrescriptionDataTable
            status="COMPLETED"
            :filterObj="filterObj"
            @showPrescriptionModal="showPrescriptionModal"
          />
        </a-tab-pane>
        <a-tab-pane key="3" tab="Declined Prescription">
          <AppPrescriptionDataTable
            status="BOOKED"
            :filterObj="filterObj"
            @showPrescriptionModal="showPrescriptionModal"
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
      :visible="prescriptionModalIsVisible"
      width="500px"
      :confirm-loading="confirmLoading"
      :footer="null"
      :destroy-on-close="true"
      :mask-style="{ background: 'rgba(61, 12, 60, 0.9)' }"
      centered
      @cancel="closeModal"
    >
      <div>
        <h6 class="t-c">Prescription for Strong Headache</h6>
        <a-divider />
        <AppPrescriptionForm
          :current-prescription-obj="currentPrescriptionObj"
        />
      </div>
    </a-modal>
  </div>
</template>
<script>
import AppTabs from '@/components/AppTabs'
import AppInput from '@/components/AppInput'
import AppSelect from '@/components/AppSelect'
import AppPrescriptionDataTable from '@/components/admin/patient/precription-test/prescription/AppPrescriptionDataTable'
import AppPrescriptionForm from '@/components/admin/patient/precription-test/prescription/AppPrescriptionForm'

export default {
  name: 'AppPrescription',
  components: {
    AppTabs,
    AppInput,
    AppSelect,
    AppPrescriptionDataTable,
    AppPrescriptionForm,
  },
  data() {
    return {
      activeKey: '1',
      filterObj: {},
      prescriptionModalIsVisible: false,
      confirmLoading: false,
      currentPrescriptionObj: {},
      dataSource1: [
        {
          prescriptionId: '#000001',
          prescriptionTitle: 'Prescription for Strong Headache',
          prescribedBy: 'Dr Yomi',
          prescriptionDate: '30th March, 2021',
          status: 'Pending',
        },
      ],
      dataSource2: [
        {
          prescriptionId: '#000001',
          prescriptionTitle: 'Prescription for Strong Headache',
          prescribedBy: 'Dr Yomi',
          prescriptionDate: '30th March, 2021',
          status: 'Active',
        },
      ],
      dataSource3: [
        {
          prescriptionId: '#000001',
          prescriptionTitle: 'Prescription for Strong Headache',
          prescribedBy: 'Dr Yomi',
          prescriptionDate: '30th March, 2021',
          status: 'Active',
        },
      ],
    }
  },
  methods: {
    showPrescriptionModal(record) {
      this.prescriptionModalIsVisible = true
      this.currentPrescriptionObj = record
    },
    closeModal() {
      this.prescriptionModalIsVisible = false
    },
  },
}
</script>
<style lang="scss" scoped>
.right-info {
  position: absolute;
  right: 0;
  top: 0;
  width: 35%;
}
h6 {
  color: $dark-purple;
}
</style>
