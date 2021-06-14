<template>
  <div>
    <a-form>
      <ValidationObserver ref="observer" tag="div">
        <a-row type="flex" :gutter="24">
          <a-col :span="12">
            <AppInput v-model="testObj.testId" label="Test ID" name="test id" />
          </a-col>
          <a-col :span="12">
            <AppInput
              v-model="testObj.complaint"
              label="Complaint"
              name="Complaint"
            />
          </a-col>
          <a-col :span="12">
            <AppInput
              v-model="testObj.prescriptionBy"
              label="Prescription By"
              name="prescription by"
            />
          </a-col>
          <a-col :span="12">
            <AppInput v-model="testObj.status" label="Status" name="status" />
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
        />
      </div>

      <br />
      <div v-if="testObj.status !== 'Pending'">
        <p>Diagnostic Center Information</p>
        <a-table
          :columns="diagnosticColumns"
          :data-source="diagnosticDataSource"
          :pagination="false"
        />
      </div>
    </div>
    <br />
    <div v-if="testObj.status === 'Pending'" class="t-c">
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
      width="600px"
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
        <AppDiagnosticTable />
      </div>
    </a-modal>
  </div>
</template>
<script>
import { ValidationObserver } from 'vee-validate'
import AppInput from '@/components/AppInput'
import AppDiagnosticTable from '@/components/admin/patient/precription-test/test/AppDiagnosticTable'
export default {
  name: 'AppTestForm',
  components: {
    ValidationObserver,
    AppInput,
    AppDiagnosticTable,
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
      dataSource: [
        {
          id: 1,
          medicalTestName: 'Malaria Strip Test',
        },
        {
          id: 2,
          medicalTestName: 'WBC/Differential',
        },
      ],
      diagnosticDataSource: [
        {
          name: 'Smith Diagnostic Center',
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
          title: 'MEDICAL TEST NAME',
          dataIndex: 'medicalTestName',
          scopedSlots: { customRender: 'medicalTestName' },
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
          }
        }
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
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
