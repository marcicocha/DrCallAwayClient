<template>
  <div>
    <a-form>
      <ValidationObserver ref="observer" tag="div">
        <a-row type="flex" :gutter="24">
          <a-col :span="12">
            <AppInput
              v-model="prescriptionObj.prescriptionId"
              label="Prescription ID"
              name="prescription id"
            />
          </a-col>
          <a-col :span="12">
            <AppInput
              v-model="prescriptionObj.prescriptionBy"
              label="Prescription By"
              name="prescription by"
            />
          </a-col>
          <a-col :span="12">
            <AppInput
              v-model="prescriptionObj.prescriptionDate"
              label="Prescription Date"
              name="prescription date"
            />
          </a-col>
          <a-col :span="12">
            <AppInput
              v-model="prescriptionObj.status"
              label="Status"
              name="status"
            />
          </a-col>
        </a-row>
      </ValidationObserver>
    </a-form>
    <br />
    <div class="colored-table">
      <div>
        <p>Prescribed Drugs</p>
        <a-table
          :columns="columns"
          :data-source="dataSource"
          :pagination="false"
        />
      </div>

      <br />
      <div v-if="prescriptionObj.status !== 'Pending'">
        <p>Pharmacy Information</p>
        <a-table
          :columns="pharmacyColumns"
          :data-source="pharmacyDataSource"
          :pagination="false"
        />
      </div>
    </div>
    <br />
    <div v-if="prescriptionObj.status === 'Pending'" class="t-c">
      <AppButton
        type="primary"
        :block="false"
        :loading="isLoading"
        class="admin-button"
        @click="submitHandler"
        >SELECT PHARMACY</AppButton
      >
    </div>
    <a-modal
      :visible="pharmacyModalIsVisible"
      width="600px"
      :confirm-loading="confirmLoading"
      :footer="null"
      :destroy-on-close="true"
      :mask-style="{ background: 'rgba(61, 12, 60, 0.9)' }"
      centered
      @cancel="closeModal"
    >
      <div>
        <h6 class="t-c">Pharmacies Near You</h6>
        <a-divider />
        <AppPharmacyTable />
      </div>
    </a-modal>
  </div>
</template>
<script>
import { ValidationObserver } from 'vee-validate'
import AppInput from '@/components/AppInput'
import AppButton from '@/components/AppButton'
import AppPharmacyTable from '@/components/admin/patient/precription-test/prescription/AppPharmacyTable'
export default {
  name: 'AppPrescriptionForm',
  components: {
    ValidationObserver,
    AppInput,
    AppButton,
    AppPharmacyTable,
  },
  props: {
    currentPrescriptionObj: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      prescriptionObj: {},
      confirmLoading: false,
      pharmacyModalIsVisible: false,
      isLoading: false,
      dataSource: [
        {
          id: 1,
          name: '#00001',
          dosage: 'Mr. Kolawole Ojo',
          duration: '30th March, 2021',
        },
        {
          id: 2,
          name: '#00002',
          dosage: 'Mr. Kolawole Ojo',
          duration: '30th March, 2021',
        },
      ],
      pharmacyDataSource: [
        {
          name: 'Mr. Kolawole Ojo',
          address: 'Ijapo Estate',
          phoneNumber: '08100969815',
        },
      ],
    }
  },
  computed: {
    columns() {
      const columns = [
        {
          title: 'S/N',
          dataIndex: 'sn',
          scopedSlots: { customRender: 'sn' },
        },
        {
          title: 'Name',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' },
        },
        {
          title: 'Dosage',
          dataIndex: 'dosage',
          scopedSlots: { customRender: 'dosage' },
        },
        {
          title: 'Duration (Days)',
          dataIndex: 'duration',
          scopedSlots: { customRender: 'duration' },
        },
      ]
      return columns
    },
    pharmacyColumns() {
      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' },
        },
        {
          title: 'Address',
          dataIndex: 'address',
          scopedSlots: { customRender: 'address' },
        },
        {
          title: 'Phone Number',
          dataIndex: 'phoneNumber',
          scopedSlots: { customRender: 'phoneNumber' },
        },
      ]
      return columns
    },
  },
  watch: {
    currentPrescriptionObj: {
      handler(newCurrentPrescriptionObj) {
        if (!newCurrentPrescriptionObj) {
          this.prescriptionObj = {}
        } else {
          this.prescriptionObj = {
            ...newCurrentPrescriptionObj,
          }
        }
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    closeModal() {
      this.pharmacyModalIsVisible = false
    },
    submitHandler() {
      this.pharmacyModalIsVisible = true
    },
  },
}
</script>
<style lang="scss" scoped>
p {
  font-weight: bold;
  color: $dark-purple;
  font-size: 14px;
}
h6 {
  color: $dark-purple;
}
</style>