<template>
  <div>
    <AppTabs v-model="activeKey" @tabClick="changeTabHandler">
      <template slot="default">
        <a-tab-pane key="1" tab="Pending Cases">
          <AppCaseFileDataTable
            :data-source="allCaseFiles"
            :columns="columns"
            @showCaseFile="showCaseFile"
          />
        </a-tab-pane>
        <a-tab-pane key="2" tab="Active Cases">
          <AppCaseFileDataTable
            :data-source="allCaseFiles"
            :columns="columns"
            @showCaseFile="showCaseFile"
            @showChatDrawer="showChatDrawer"
          />
        </a-tab-pane>
        <a-tab-pane key="3" tab="Completed Cases">
          <AppCaseFileDataTable
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
    <AppChatDrawer
      :doctor="doctor"
      status="patient"
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
import AppChatDrawer from '@/components/AppChatDrawer1'
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
      counter: 0,
      status: 'PENDING',
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
          title: 'Consultant Name',
          dataIndex: 'doctor',
          scopedSlots: { customRender: 'doctor' },
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
      if (this.currentCaseFile.doctor) {
        return `${this.currentCaseFile.doctor.first_name} ${this.currentCaseFile.doctor.last_name}`
      }
      return ''
    },
    ...mapState({
      allCaseFiles: (state) => state.caseFileModule.caseFiles,
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
      // try {
      //   await this.getMessageHandler(this.currentCaseFile.id)
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
      // this.viewIsVisible = true
      this.$router.push({
        name: 'admin-patient-case-file-id',
        params: { id: record.id },
      })
    },
    closeViewHandler() {
      this.viewIsVisible = false
    },
    async changeTabHandler(key) {
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
      getAllCaseFile: 'caseFileModule/GET_CASE_FILE',
      resetHandler: 'caseFileModule/RESET_CASE_FILE',
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
