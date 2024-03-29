<template>
  <div>
    <a-form>
      <ValidationObserver ref="observer" tag="div">
        <a-row type="flex" :gutter="24">
          <a-col :span="12">
            <AppInput
              v-model="testObj.id"
              label="Test ID"
              name="test id"
              disabled
            />
          </a-col>
          <a-col :span="12">
            <AppInput
              v-model="testObj.complaint"
              label="Complaint"
              name="Complaint"
              disabled
            />
          </a-col>
          <a-col :span="12">
            <AppInput
              v-model="testObj.prescriptionBy"
              label="Prescription By"
              name="prescription by"
              disabled
            />
          </a-col>
          <a-col :span="12">
            <AppInput
              v-model="testObj.status"
              label="Status"
              name="status"
              disabled
            />
          </a-col>
          <a-col v-if="testObj.status !== 'PENDING'" :span="24">
            <AppTextArea
              v-model="testObj.addition_information"
              label="Test Instruction/Additional Information"
              colon="false"
              disabled
            />
          </a-col>
        </a-row>
      </ValidationObserver>
    </a-form>
    <br />
    <div class="colored-table">
      <div>
        <p>Prescribed Test</p>
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
      <div v-if="testObj.status !== 'PENDING' && currentTestObj.partners">
        <p>Diagnostic Center Information</p>
        <a-table
          :columns="diagnosticColumns"
          :data-source="diagnosticDataSource"
          :pagination="false"
        />
      </div>
    </div>
    <br />
    <div v-if="testObj.status === 'PENDING' && !testObj.partners" class="t-c">
      <AppButton
        type="primary"
        :block="false"
        :loading="isLoading"
        class="admin-button"
        @click="submitHandler"
        >SELECT CENTER</AppButton
      >
    </div>
    <a-modal
      :visible="diagnosticModalIsVisible"
      width="800px"
      :confirm-loading="confirmLoading"
      :footer="null"
      :destroy-on-close="true"
      :mask-style="{ background: 'rgba(61, 12, 60, 0.9)' }"
      centered
      @cancel="closeModal"
    >
      <div>
        <h6 class="t-c">Diagnostic Centers Near You</h6>
        <a-divider />
        <AppDiagnosticTable
          :test-list="dataSource"
          :current-test-obj="testObj"
          @onClose="onClose"
        />
      </div>
    </a-modal>
  </div>
</template>
<script>
import { ValidationObserver } from 'vee-validate'
import AppInput from '@/components/AppInput'
import AppDiagnosticTable from '@/components/admin/patient/precription-test/test/AppDiagnosticTable'
import AppTextArea from '@/components/AppTextArea'

export default {
  name: 'AppTestForm',
  components: {
    ValidationObserver,
    AppInput,
    AppDiagnosticTable,
    AppTextArea,
  },
  props: {
    currentTestObj: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      testObj: {},
      isLoading: false,
      diagnosticModalIsVisible: false,
      confirmLoading: false,
      selectedDiagnosticObj: {},
      dataSource: [],
    }
  },
  computed: {
    diagnosticDataSource() {
      if (this.testObj.partners) {
        const newArray = [
          {
            name: this.testObj.partners.registered_name,
            address: this.testObj.partners.address,
            phoneNumber: this.testObj.partners.mobile_phone_number,
          },
        ]
        return newArray
      }
      return []
    },
    columns() {
      const columns = [
        {
          title: 'S/N',
          dataIndex: 'sn',
          scopedSlots: { customRender: 'sn' },
        },
        {
          title: 'MEDICAL TEST NAME',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' },
        },
      ]
      return columns
    },
    diagnosticColumns() {
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
    currentTestObj: {
      handler(newCurrentTestObj) {
        if (!newCurrentTestObj) {
          this.testObj = {}
        } else {
          this.testObj = {
            ...newCurrentTestObj,
            prescriptionBy: `${newCurrentTestObj.doctor.first_name} ${newCurrentTestObj.doctor.last_name}`,
            complaint: newCurrentTestObj.caseFile.initial_complain,
          }
          this.dataSource = newCurrentTestObj.tests
            ? [...newCurrentTestObj.tests]
            : []
        }
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    onClose() {
      this.closeModal()
      this.$emit('closeModal')
    },
    submitHandler() {
      this.diagnosticModalIsVisible = true
    },
    closeModal() {
      this.diagnosticModalIsVisible = false
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
