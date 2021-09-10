<template>
  <div>
    <AppTabs
      v-if="!viewIsVisible"
      v-model="activeKey"
      @tabClick="changeTabHandler"
    >
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
    <div v-if="viewIsVisible">
      <div>
        <a @click="closeViewHandler"
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
          status="patient"
        />
      </div>
    </div>
    <AppChatDrawer
      :doctor="doctor"
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
import AppChatDrawer from '@/components/AppChatDrawer'
export default {
  components: {
    AppTabs,
    AppInput,
    AppSelect,
    AppCaseFileDataTable,
    AppCaseFileForm,
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
  methods: {
    onClose() {
      this.chatDrawerIsVisible = false
    },
    async showChatDrawer(record) {
      this.chatDrawerIsVisible = true
      this.currentCaseFile = record
      try {
        await this.getMessageHandler(this.currentCaseFile.id)
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
