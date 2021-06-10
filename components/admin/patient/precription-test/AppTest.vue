<template>
  <div>
    <h6>TESTS</h6>
    <AppTabs v-model="activeKey">
      <template slot="default">
        <a-tab-pane key="1" tab="Pending Tests" force-render>
          <AppTestDataTable :status="pending" :data-source="dataSource1" />
        </a-tab-pane>
        <a-tab-pane key="3" tab="Completed Test" force-render>
          <AppTestDataTable :status="completed" :data-source="dataSource2" />
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
  </div>
</template>
<script>
import AppTabs from '@/components/AppTabs'
import AppInput from '@/components/AppInput'
import AppSelect from '@/components/AppSelect'
import AppTestDataTable from '@/components/admin/patient/precription-test/AppTestDataTable'

export default {
  name: 'AppTest',
  components: {
    AppTabs,
    AppInput,
    AppSelect,
    AppTestDataTable,
  },
  data() {
    return {
      activeKey: '1',
      filterObj: {},
      dataSource1: [
        {
          testId: '#000001',
          caseAssociated: 'Dr. Michael Sanwo-Olu',
          prescribedBy: 'Malaria and Typhoid',
          status: 'Pending',
        },
      ],
      dataSource2: [
        {
          testId: '#000001',
          caseAssociated: 'Dr. Michael Sanwo-Olu',
          prescribedBy: 'Malaria and Typhoid',
          status: 'Active',
        },
      ],
    }
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
