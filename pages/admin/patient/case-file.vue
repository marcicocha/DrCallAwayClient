<template>
  <div>
    <AppTabs v-if="!viewIsVisible" v-model="activeKey">
      <template slot="default">
        <a-tab-pane key="1" tab="Pending Cases" force-render>
          <AppCaseFileDataTable
            status="pending"
            :data-source="dataSource1"
            @showCaseFile="showCaseFile"
          />
        </a-tab-pane>
        <a-tab-pane key="2" tab="Active Cases" force-render>
          <AppCaseFileDataTable
            status="active"
            :data-source="dataSource2"
            @showCaseFile="showCaseFile"
          />
        </a-tab-pane>
        <a-tab-pane key="3" tab="Completed Cases" force-render>
          <AppCaseFileDataTable
            status="completed"
            :data-source="dataSource3"
            @showCaseFile="showCaseFile"
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
    <div v-if="viewIsVisible">
      <div>
        <a @click="closeViewHandler"
          ><img src="@/assets/images/long-arrow-left.svg"
        /></a>
      </div>
      <br />
      <AppTitleDivider :title="`Case File / ${currentCaseFile.caseId}`"
        ><span class="right-details"
          ><span style="color: $dark-purple">Status:</span>
          <span
            :class="{
              blue: currentCaseFile.status === 'Active',
              green: currentCaseFile.status === 'Completed',
              red: currentCaseFile.status === 'Pending',
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
  </div>
</template>
<script>
import AppTabs from '@/components/AppTabs'
import AppInput from '@/components/AppInput'
import AppSelect from '@/components/AppSelect'
import AppCaseFileDataTable from '@/components/admin/patient/case-file/AppCaseFileDataTable.vue'
import AppCaseFileForm from '@/components/admin/patient/case-file/AppCaseFileForm'

export default {
  components: {
    AppTabs,
    AppInput,
    AppSelect,
    AppCaseFileDataTable,
    AppCaseFileForm,
  },
  layout: 'dashboard',
  data() {
    return {
      activeKey: '1',
      filterObj: {},
      viewIsVisible: false,
      currentCaseFile: {},
      isReadOnly: true,
      dataSource1: [
        {
          caseId: '#000001',
          consultantName: 'Dr. Michael Sanwo-Olu',
          consultantPosition: 'Doctor',
          complaint: 'Malaria and Typhoid',
          dateAdded: '23rd March, 2021',
          status: 'Pending',
        },
      ],
      dataSource2: [
        {
          caseId: '#000001',
          consultantName: 'Dr. Michael Sanwo-Olu',
          consultantPosition: 'Doctor',
          complaint: 'Malaria and Typhoid',
          dateAdded: '23rd March, 2021',
          status: 'Active',
        },
      ],
      dataSource3: [
        {
          caseId: '#000002',
          consultantName: 'Dr. Michael Sanwo-Olu',
          consultantPosition: 'Doctor',
          complaint: 'Malaria and Typhoid',
          dateAdded: '23rd March, 2021',
          status: 'Completed',
        },
      ],
    }
  },
  methods: {
    showCaseFile(record) {
      this.viewIsVisible = true
      this.currentCaseFile = record
    },
    closeViewHandler() {
      this.viewIsVisible = false
    },
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
