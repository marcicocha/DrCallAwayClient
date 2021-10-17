<template>
  <div>
    <AppTabs
      v-if="!viewIsVisible"
      v-model="activeKey"
      @tabClick="changeTabHandler"
    >
      <template slot="default">
        <a-tab-pane key="1" tab="Active Cases" force-render>
          <AppCaseFileDataTable
            status="ACTIVE"
            :data-source="allCaseFiles"
            :columns="columns"
            @showCaseFile="showCaseFile"
            @showChatDrawer="showChatDrawer"
          />
        </a-tab-pane>
        <a-tab-pane key="2" tab="Completed Cases">
          <AppCaseFileDataTable
            status="COMPLETED"
            :data-source="allCaseFiles"
            :columns="columns"
            @showCaseFile="showCaseFile"
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
    <div v-if="viewIsVisible">
      <div v-if="!testIsVisible">
        <div>
          <a @click="closeViewHandler('case')"
            ><img src="@/assets/images/long-arrow-left.svg"
          /></a>
        </div>
        <br />
        <AppTitleDivider :title="`Case File / ${currentCaseFile.case_id}`"
          ><span class="right-details"
            ><span style="color: $dark-purple">Status:</span>
            <span
              :class="{
                blue: currentCaseFile.status === 'ACTIVE',
                green: currentCaseFile.status === 'COMPLETED',
                red: currentCaseFile.status === 'PENDING',
              }"
              >{{ currentCaseFile.status }}</span
            ></span
          ></AppTitleDivider
        >
        <div>
          <AppCaseFileForm
            :current-case-file="currentCaseFile"
            status="doctor"
            @showTestTab="showTestTab"
            @switchToCompleteTab="switchToCompleteTab"
          />
        </div>
      </div>
      <div v-else>
        <div>
          <a @click="closeViewHandler('test')"
            ><img src="@/assets/images/long-arrow-left.svg"
          /></a>
        </div>
        <br />
        <AppScreeningTab :case-id="currentCaseFile.id" />
      </div>
    </div>
    <AppChatDrawer
      :doctor="doctor"
      status="doctor"
      :current-case-file="currentCaseFile"
      :chat-drawer-is-visible="chatDrawerIsVisible"
      @onClose="onClose"
    />
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import AppTabs from '@/components/AppTabs'
import AppInput from '@/components/AppInput'
import AppSelect from '@/components/AppSelect'
import AppCaseFileDataTable from '@/components/admin/patient/case-file/AppCaseFileDataTable.vue'
import AppCaseFileForm from '@/components/admin/patient/case-file/AppCaseFileForm'
import AppScreeningTab from '@/components/admin/doctor/case-file/AppScreeningTab'
import AppChatDrawer from '@/components/AppChatDrawer1'

export default {
  components: {
    AppTabs,
    AppInput,
    AppSelect,
    AppCaseFileDataTable,
    AppCaseFileForm,
    AppScreeningTab,
    AppChatDrawer,
  },
  layout: 'dashboard',
  data() {
    return {
      activeKey: '1',
      filterObj: {},
      viewIsVisible: false,
      currentCaseFile: {},
      isReadOnly: true,
      testIsVisible: false,
      status: 'ACTIVE',
      chatDrawerIsVisible: false,
      TIMER_ID: null,
    }
  },
  computed: {
    columns() {
      const columns = [
        {
          title: 'Case ID',
          dataIndex: 'id',
          scopedSlots: { customRender: 'id' },
        },
        {
          title: 'Patient Name',
          dataIndex: 'patient',
          scopedSlots: { customRender: 'patient' },
        },
        {
          title: 'Complaint',
          dataIndex: 'initial_complain',
          scopedSlots: { customRender: 'initial_complain' },
        },
        {
          title: 'Date Added',
          dataIndex: 'created_at',
          scopedSlots: { customRender: 'date' },
        },
        {
          title: 'Status',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' },
        },
        {
          title: '',
          dataIndex: 'operation1',
          scopedSlots: { customRender: 'operation' },
        },
      ]
      return columns
    },
    doctor() {
      if (this.currentCaseFile.patient) {
        return `${this.currentCaseFile.patient.first_name} ${this.currentCaseFile.patient.last_name}`
      }
      return ''
    },
    ...mapState({
      allCaseFiles: (state) => state.caseFileDoctorModule.caseFiles,
    }),
  },
  mounted() {
    this.changeTabHandler('1')
  },
  destroyed() {
    this.resetHandler()
  },
  methods: {
    onClose() {
      this.chatDrawerIsVisible = false
      clearInterval(this.TIMER_ID)
    },
    switchToCompleteTab() {
      this.activeKey = '2'
      this.changeTabHandler('2')
      this.viewIsVisible = false
    },
    async showChatDrawer(record) {
      this.currentCaseFile = record
      try {
        this.TIMER_ID = setInterval(() => {
          this.getMessageHandler(this.currentCaseFile.id)
        }, 5000)
        this.chatDrawerIsVisible = true
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
    showCaseFile(record) {
      this.viewIsVisible = true
      this.currentCaseFile = record
    },
    closeViewHandler(key) {
      if (key === 'case') {
        this.viewIsVisible = false
      }
      if (key === 'test') {
        this.testIsVisible = false
      }
    },
    async changeTabHandler(key) {
      if (key === '1') {
        this.status = 'ACTIVE'
      }
      if (key === '2') {
        this.status = 'COMPLETED'
      }
      try {
        const obj = {
          ...this.filterObj,
          status: this.status,
        }
        await this.getAllCaseFile(obj)
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
    showTestTab() {
      this.testIsVisible = true
    },
    ...mapActions({
      getAllCaseFile: 'caseFileDoctorModule/GET_DOCTOR_CASE_FILE',
      resetHandler: 'caseFileDoctorModule/RESET_CASE_FILE',
      getMessageHandler: 'messageModule/GET_MESSAGE',
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
</style>
