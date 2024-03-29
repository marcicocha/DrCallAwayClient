<template>
  <div>
    <AppTabs v-model="activeKey" @tabClick="changeTabHandler">
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
    <div v-if="viewIsVisible"></div>
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
import AppChatDrawer from '@/components/AppChatDrawer'

export default {
  components: {
    AppTabs,
    AppInput,
    AppSelect,
    AppCaseFileDataTable,
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

    showChatDrawer(record) {
      this.currentCaseFile = record
      this.chatDrawerIsVisible = true

      // try {
      //   this.TIMER_ID = setInterval(() => {
      //     this.getMessageHandler(this.currentCaseFile.id)
      //   }, 5000)
      //   this.chatDrawerIsVisible = true
      // } catch (err) {
      //   const { default: errorHandler } = await import('@/utils/errorHandler')
      //   errorHandler(err).forEach((msg) => {
      //     this.$notification.error({
      //       message: 'Error',
      //       description: msg,
      //       duration: 4000,
      //     })
      //   })
      // }
    },
    showCaseFile(record) {
      this.$router.push({
        name: 'admin-doctor-case-management-id',
        params: { id: record.id },
      })
    },
    closeViewHandler(key) {
      if (key === 'case') {
        this.changeTabHandler(this.activeKey)
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
