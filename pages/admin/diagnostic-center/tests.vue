<template>
  <div>
    <p class="page_heading">CALLUPS</p>
    <AppTabs v-model="activeKey" @tabClick="changeTabHandler">
      <template slot="default">
        <a-tab-pane key="1" tab="Pending Tests" force-render>
          <AppPrescriptionDataTable
            status="PENDING"
            :data-source="allTest"
            @showTestModal="showTestModal"
          />
        </a-tab-pane>
        <a-tab-pane key="2" tab="Completed Tests">
          <AppPrescriptionDataTable
            status="COMPLETED"
            :data-source="allTest"
            @showTestModal="showTestModal"
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
        <a-row type="flex" :gutter="16">
          <a-col :span="12">
            <AppInput v-model="currentTest.testId" label="Test ID" />
          </a-col>
          <a-col :span="12">
            <AppInput v-model="currentTest.complaint" label="Complaint" />
          </a-col>
          <a-col :span="12">
            <AppDatePicker
              v-model="currentTest.prescriptionBy"
              label="Prescription By"
            />
          </a-col>
          <a-col :span="12">
            <AppDatePicker
              v-model="currentTest.patientName"
              label="Patient Name"
            />
          </a-col>
        </a-row>
        <div>
          <p>Prescribed Tests</p>
          <a-table
            :columns="columns"
            :data-source="currentTest.test"
            :pagination="false"
            :row-key="(record) => record.id"
          >
            <template slot="sn" slot-scope="text, record, index">
              {{ index + 1 }}
            </template>
          </a-table>
        </div>

        <div v-if="currentTest.diagnostic_center">
          <p>Diagnostic Center Information</p>
          <a-table
            :columns="diagnosticColumns"
            :data-source="currentTest.diagnostic_center"
            :pagination="false"
            :row-key="(record) => record.id"
          >
            <template slot="sn" slot-scope="text, record, index">
              {{ index + 1 }}
            </template>
          </a-table>
        </div>
        <br />
        <div v-if="currentTest.status === 'PENDING'" class="t-c">
          <a-row type="flex" :gutter="16">
            <a-col :span="12">
              <AppButton
                type="primary"
                :block="false"
                :loading="isLoading"
                class="admin-button"
                @click="acceptTestHandler"
                >ACCEPT</AppButton
              >
            </a-col>
            <a-col :span="12">
              <AppButton
                type="primary"
                :block="false"
                :loading="isLoading"
                class="admin-button"
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
import AppSelect from '@/components/AppSelect'
import AppDatePicker from '@/components/AppDatePicker'
import AppPrescriptionDataTable from '@/components/admin/pharmacy/AppPrescriptionDataTable'
export default {
  components: {
    AppTabs,
    AppInput,
    AppSelect,
    AppPrescriptionDataTable,
    AppDatePicker,
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
      this.currentTest = record
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
              `ambulance/accept/callup/${this.currentTest.id}`,
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
</style>
