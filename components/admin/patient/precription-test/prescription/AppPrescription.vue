<template>
  <div>
    <h6>PRECRIPTIONS</h6>
    <AppTabs v-model="activeKey" @tabClick="changeTabHandler">
      <template slot="default">
        <a-tab-pane key="1" tab="Pending Prescription" force-render>
          <AppPrescriptionDataTable
            :data-source="allPrescription"
            @showPrescriptionModal="showPrescriptionModal"
          />
        </a-tab-pane>
        <a-tab-pane key="2" tab="Completed Prescription">
          <AppPrescriptionDataTable
            :data-source="allPrescription"
            @showPrescriptionModal="showPrescriptionModal"
          />
        </a-tab-pane>
        <a-tab-pane key="3" tab="Declined Prescription">
          <AppPrescriptionDataTable
            :data-source="allPrescription"
            @showPrescriptionModal="showPrescriptionModal"
          />
        </a-tab-pane>
      </template>
      <template slot="rightInfo">
        <a-row type="flex" :gutter="16" class="right-info" justify="end">
          <a-col v-if="false" :span="12">
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
        <h6 class="t-c">
          {{ `Prescription for ${currentPrescriptionObj.ailment}` }}
        </h6>
        <a-divider />
        <AppPrescriptionForm
          :current-prescription-obj="currentPrescriptionObj"
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
      status: 'PENDING',
    }
  },
  computed: {
    ...mapState({
      allPrescription: (state) => state.prescriptionModule.prescriptions,
    }),
  },
  mounted() {
    this.changeTabHandler('1')
  },
  methods: {
    showPrescriptionModal(record) {
      this.prescriptionModalIsVisible = true
      this.currentPrescriptionObj = record
    },
    closeModal() {
      this.prescriptionModalIsVisible = false
    },
    async changeTabHandler(key) {
      if (key === '1') {
        this.status = 'PENDING'
      }
      if (key === '2') {
        this.status = 'COMPLETED'
      }
      if (key === '3') {
        this.status = 'DECLINED'
      }
      try {
        const obj = {
          ...this.filterObj,
          status: this.status,
        }
        await this.getAllPrescription(obj)
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
      getAllPrescription: 'prescriptionModule/GET_PRESCRIPTION',
    }),
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
