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
              disabled
            />
          </a-col>
          <a-col :span="12">
            <AppInput
              v-model="prescriptionObj.prescriptionBy"
              label="Prescription By"
              name="prescription by"
              disabled
            />
          </a-col>
          <a-col :span="12">
            <AppDatePicker
              v-model="prescriptionObj.prescriptionDate"
              label="Prescription Date"
              name="prescription date"
              disabled
            />
          </a-col>
          <a-col :span="12">
            <AppInput
              v-model="prescriptionObj.status"
              label="Status"
              name="status"
              disabled
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
        >
          <template slot="sn" slot-scope="text, record, index">
            {{ index + 1 }}
          </template>
        </a-table>
      </div>

      <br />
      <div v-if="prescriptionObj.status !== 'PENDING'">
        <p>Pharmacy Information</p>
        <a-table
          :columns="pharmacyColumns"
          :data-source="pharmacyDataSource"
          :pagination="false"
        />
      </div>
    </div>
    <br />
    <div v-if="prescriptionObj.status === 'PENDING'" class="t-c">
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
      width="800px"
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
        <AppPharmacyTable
          :drug-list="dataSource"
          :prescriptionObj="prescriptionObj"
          @onClose="onClose"
        />
      </div>
    </a-modal>
  </div>
</template>
<script>
import { ValidationObserver } from 'vee-validate'
import AppInput from '@/components/AppInput'
import AppDatePicker from '@/components/AppDatePicker'
import AppButton from '@/components/AppButton'
import AppPharmacyTable from '@/components/admin/patient/precription-test/prescription/AppPharmacyTable'
export default {
  name: 'AppPrescriptionForm',
  components: {
    ValidationObserver,
    AppInput,
    AppButton,
    AppPharmacyTable,
    AppDatePicker,
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
      dataSource: [],
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
            prescriptionBy: `${newCurrentPrescriptionObj.partners.first_name} ${newCurrentPrescriptionObj.partners.last_name}`,
            prescriptionDate: newCurrentPrescriptionObj.updated_at,
            prescriptionId: newCurrentPrescriptionObj.case_file_id,
          }
          this.dataSource = newCurrentPrescriptionObj.drugs
            ? [...newCurrentPrescriptionObj.drugs]
            : []
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
    onClose() {
      this.closeModal()
      this.$emit('closeModal')
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
