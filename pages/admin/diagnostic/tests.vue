<template>
  <div>
    <p class="page_heading">TESTS</p>
    <AppTabs v-model="activeKey" @tabClick="changeTabHandler">
      <template slot="default">
        <a-tab-pane key="1" tab="Pending Tests" force-render>
          <AppTestDataTable
            status="PENDING"
            :data-source="allTest"
            @showTestModal="showTestModal"
          />
        </a-tab-pane>
        <a-tab-pane key="2" tab="Completed Tests">
          <AppTestDataTable
            status="COMPLETED"
            :data-source="allTest"
            @showTestModal="showTestModal"
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
      :visible="modalIsVisible"
      width="600px"
      :confirm-loading="confirmLoading"
      :footer="null"
      :destroy-on-close="true"
      :mask-style="{ background: 'rgba(61, 12, 60, 0.9)' }"
      centered
      @cancel="closeModal"
    >
      <div>
        <h6 class="t-c">Test for Case {{ currentTest.case_id }}</h6>
        <a-divider />
        <a-row type="flex" :gutter="16">
          <a-col :span="12">
            <AppInput v-model="currentTest.id" label="Test ID" disabled />
          </a-col>
          <a-col :span="12">
            <AppInput
              v-model="currentTest.complaint"
              label="Complaint"
              disabled
            />
          </a-col>
          <a-col :span="12">
            <AppInput
              v-model="currentTest.prescriptionBy"
              label="Prescription By"
              disabled
            />
          </a-col>
          <a-col :span="12">
            <AppInput
              v-model="currentTest.patientName"
              label="Patient Name"
              disabled
            />
          </a-col>
        </a-row>
        <br />
        <div class="colored-table">
          <p>Prescribed Tests</p>
          <a-table
            :columns="columns"
            :data-source="currentTest.tests"
            :pagination="false"
            :row-key="(record) => record.id"
          >
            <template slot="sn" slot-scope="text, record, index">
              {{ index + 1 }}
            </template>
          </a-table>
        </div>
        <br />
        <div>
          <a-form>
            <AppTextArea
              v-model="testInstruction"
              label="Test Instruction/Additional Information"
              colon="false"
              :disabled="currentTest.status === 'COMPLETED'"
            />
          </a-form>
        </div>
        <br />
        <div v-if="currentTest.status === 'ACTIVE'" class="t-c">
          <a-row type="flex" :gutter="16">
            <a-col :span="12">
              <AppButton
                type="primary"
                :loading="isLoading"
                class="admin-button"
                @click="acceptTestHandler"
                >ACCEPT</AppButton
              >
            </a-col>
            <a-col :span="12">
              <AppButton
                type="primary"
                :loading="isLoading"
                class="admin-button reject__btn"
                @click="rejectTestHandler"
                >REJECT</AppButton
              >
            </a-col>
          </a-row>
        </div>
        <div v-if="currentTest.status === 'COMPLETED'" class="t-c">
          <a-row type="flex" :gutter="16">
            <a-col :span="12">
              <AppButton
                type="primary"
                :block="false"
                :loading="isLoading"
                class="admin-button"
                @click="viewResultHandler"
                >VIEW RESULT</AppButton
              >
            </a-col>
            <a-col :span="12">
              <AppButton
                type="primary"
                :block="false"
                :loading="isLoading"
                class="admin-button"
                @click="downloadResultHandler"
                >DOWNLOAD RESULT</AppButton
              >
            </a-col>
          </a-row>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import AppTabs from '@/components/AppTabs'
import AppInput from '@/components/AppInput'
import AppTextArea from '@/components/AppTextArea'
import AppSelect from '@/components/AppSelect'
import AppTestDataTable from '@/components/admin/diagnostic-center/AppTestDataTable'

export default {
  components: {
    AppTabs,
    AppInput,
    AppSelect,
    AppTestDataTable,
    AppTextArea,
  },
  layout: 'dashboard',
  data() {
    return {
      activeKey: '1',
      filterObj: {},
      modalIsVisible: false,
      currentTest: {},
      confirmLoading: false,
      isLoading: false,
      status: 'PENDING',
      testInstruction: '',
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
          dataIndex: 'name',
        },
      ]
      return columns
    },
    diagnosticColumns() {
      const columns = [
        {
          title: 'NAME',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' },
        },
        {
          title: 'ADDRESS',
          dataIndex: 'address',
        },
        {
          title: 'PHONE NUMBER',
          dataIndex: 'mobile_phone_number',
        },
      ]
      return columns
    },
    ...mapState({
      allTest: (state) => state.testDiagnosticModule.tests,
    }),
  },
  mounted() {
    this.changeTabHandler('1')
  },
  methods: {
    showTestModal(record) {
      this.currentTest = {
        ...record,
        complaint: record.caseFile.initial_complain,
        prescriptionBy: `${record.doctor.first_name} ${record.doctor.last_name}`,
        patientName: `${record.caseFile.patient.first_name} ${record.caseFile.patient.last_name}`,
      }
      this.modalIsVisible = true
    },
    closeModal() {
      this.modalIsVisible = false
    },
    async submitHandler() {
      try {
        const user = JSON.parse(localStorage.getItem('user'))
        const config = {
          headers: { Authorization: `Bearer ${user.token.token}` },
        }
        await this.$axios.$patch(
          `pharmacy/accept/prescription/${this.currentTest.id}`,
          this.currentTest.id,
          config
        )
        this.$notification.success({
          message: 'Success',
          description: 'Request Accepted Successfully',
        })
        this.changeTabHandler('2')
        this.activeKey = '2'
      } catch (e) {
        const { default: errorHandler } = await import('@/utils/errorHandler')
        errorHandler(e).forEach((msg) => {
          this.$notification.error({
            message: 'Error',
            description: msg,
          })
        })
      }
    },
    rejectTestHandler() {
      this.modalIsVisible = false
    },
    viewResultHandler() {},
    downloadResultHandler() {},
    acceptTestHandler() {
      const $this = this
      this.$confirm({
        title: 'Are you sure you want to accept this Test?',
        content: `With ID: ${this.currentTest.id}`,
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        async onOk() {
          // vm.showModal(false)
          try {
            const user = JSON.parse(localStorage.getItem('user'))
            const config = {
              headers: { Authorization: `Bearer ${user.token.token}` },
            }
            await $this.$axios.$patch(
              `/accept/diagnostic/${this.currentTest.id}`,
              this.currentTest.id,
              config
            )
            $this.$notification.success({
              message: 'Success',
              description: 'Request Accepted Successfully',
            })
            $this.changeTabHandler('2')
            $this.activeKey = '2'
          } catch (e) {
            const { default: errorHandler } = await import(
              '@/utils/errorHandler'
            )
            errorHandler(e).forEach((msg) => {
              $this.$notification.error({
                message: 'Error',
                description: msg,
              })
            })
          }
        },
        onCancel() {},
      })
    },
    async changeTabHandler(key) {
      if (key === '1') {
        this.status = 'PENDING'
      }
      if (key === '2') {
        this.status = 'COMPLETED'
      }
      try {
        const obj = {
          ...this.filterObj,
          status: this.status,
        }
        await this.getAllTest(obj)
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
      getAllTest: 'testDiagnosticModule/GET_TEST',
    }),
  },
}
</script>
<style lang="scss" scoped>
h6 {
  color: $dark-purple;
}
p {
  font-weight: bold;
  color: $dark-purple;
  font-size: 14px;
}
.reject__btn {
  background: #524d4d !important;
  border-color: #524d4d;
}
</style>
