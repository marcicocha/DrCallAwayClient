<template>
  <div>
    <!-- <p class="page_heading">TESTS</p> -->
    <AppTabs v-model="activeKey" @tabClick="changeTabHandler">
      <template slot="default">
        <a-tab-pane key="1" tab="Pending Tests" force-render>
          <AppTestDataTable
            status="PENDING"
            :data-source="allTest"
            @showTestModal="showTestModal"
          />
        </a-tab-pane>
        <a-tab-pane key="2" tab="Active Tests" force-render>
          <AppTestDataTable
            status="ACTIVE"
            :data-source="allTest"
            @showTestModal="showTestModal"
          />
        </a-tab-pane>
        <a-tab-pane key="3" tab="Completed Tests">
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
              v-model="currentTest.addition_information"
              label="Test Instruction/Additional Information"
              colon="false"
              required
              :disabled="currentTest.status !== 'PENDING'"
            />
            <AppUpload
              v-if="currentTest.status === 'ACTIVE'"
              label="Upload Test Result"
              placeholder="click here to upload test result"
              required
              :extenstion="['pdf', 'jpg', 'png']"
              :uploaded-file-name="test_result_link"
              @change="documentHandler"
            />
          </a-form>
        </div>
        <br />
        <div v-if="currentTest.status === 'PENDING'" class="t-c">
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
        <div v-if="currentTest.status === 'ACTIVE'" class="t-c">
          <AppButton
            type="primary"
            :loading="isLoading"
            :block="false"
            class="admin-button"
            @click="completeTestHandler"
            >COMPLETE</AppButton
          >
        </div>
        <!-- <div v-if="currentTest.status === 'COMPLETED'" class="t-c">
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
        </div> -->
      </div>
    </a-modal>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import { getDownloadURL } from 'firebase/storage'
import { storage } from '~/plugins/firebase.js'
import AppTabs from '@/components/AppTabs'
import AppInput from '@/components/AppInput'
import AppTextArea from '@/components/AppTextArea'
import AppSelect from '@/components/AppSelect'
import AppTestDataTable from '@/components/admin/diagnostic-center/AppTestDataTable'
import AppUpload from '@/components/AppUpload'

export default {
  components: {
    AppTabs,
    AppInput,
    AppSelect,
    AppTestDataTable,
    AppTextArea,
    AppUpload,
  },
  layout: 'dashboard',
  data() {
    const user = JSON.parse(localStorage.getItem('user'))
    const config = {
      headers: { Authorization: `Bearer ${user.token.token}` },
    }
    return {
      activeKey: '1',
      filterObj: {},
      modalIsVisible: false,
      currentTest: {},
      confirmLoading: false,
      isLoading: false,
      status: 'PENDING',
      addition_information: '',
      config,
      test_result_link: '',
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
  destroyed() {
    this.resetHandler()
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
    documentHandler(file) {
      const storageRef = storage.ref('profile/' + file.name)
      const uploadTask = storageRef.put(file.originFileObj)
      uploadTask.on('state_changed', () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          this.test_result_link = downloadURL
        })
      })
    },
    rejectTestHandler() {
      if (!this.currentTest.addition_information) {
        this.$notification.error({
          message: 'Error',
          description: 'Test Instruction is Required',
        })
        return
      }
      const $this = this
      this.$confirm({
        title: 'Are you sure you want to reject this Test?',
        content: `With ID: ${$this.currentTest.id}`,
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        async onOk() {
          // vm.showModal(false)
          try {
            const obj = {
              addition_information: $this.currentTest.addition_information,
            }
            await $this.$axios.$patch(
              `/reject/diagnostic/${$this.currentTest.id}`,
              obj,
              $this.config
            )
            $this.$notification.success({
              message: 'Success',
              description: 'Request Rejected Successfully',
            })
            $this.changeTabHandler('1')
            $this.activeKey = '1'
            $this.modalIsVisible = false
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
    viewResultHandler() {},
    downloadResultHandler() {},
    completeTestHandler() {
      if (!this.test_result_link) {
        this.$notification.error({
          message: 'Error',
          description: 'Test Result is Required',
        })
        return
      }
      const $this = this
      this.$confirm({
        title: 'Are you sure you want to complete this Test?',
        content: `With ID: ${$this.currentTest.id}`,
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        async onOk() {
          // vm.showModal(false)
          try {
            const obj = {
              test_result_link: $this.test_result_link,
            }
            await $this.$axios.$patch(
              `/complete/diagnostic/${$this.currentTest.id}`,
              obj,
              $this.config
            )
            $this.$notification.success({
              message: 'Success',
              description: 'Request Completed Successfully',
            })
            $this.changeTabHandler('3')
            $this.activeKey = '3'
            $this.modalIsVisible = false
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
    acceptTestHandler() {
      if (!this.currentTest.addition_information) {
        this.$notification.error({
          message: 'Error',
          description: 'Test Instruction is Required',
        })
        return
      }
      const $this = this
      this.$confirm({
        title: 'Are you sure you want to accept this Test?',
        content: `With ID: ${$this.currentTest.id}`,
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        async onOk() {
          // vm.showModal(false)
          try {
            const obj = {
              addition_information: $this.currentTest.addition_information,
            }
            await $this.$axios.$patch(
              `/accept/diagnostic/${$this.currentTest.id}`,
              obj,
              $this.config
            )
            $this.$notification.success({
              message: 'Success',
              description: 'Request Accepted Successfully',
            })
            $this.changeTabHandler('2')
            $this.activeKey = '2'
            $this.modalIsVisible = false
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
      await this.resetHandler()
      if (key === '1') {
        this.status = 'PENDING'
      }
      if (key === '2') {
        this.status = 'ACTIVE'
      }
      if (key === '3') {
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
      resetHandler: 'testDiagnosticModule/RESET_ROUTINE_TEST',
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
