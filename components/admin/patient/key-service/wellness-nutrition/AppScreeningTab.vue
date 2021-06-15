<template>
  <div>
    <AppTabs v-model="activeKey">
      <template slot="default">
        <a-tab-pane key="1" tab="Tests" force-render>
          <div class="colored-table">
            <AppScreeningDataTable status="tests" :data-source="dataSource" />
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Endocrinology: Special Test">
          <div class="colored-table">
            <AppScreeningDataTable
              status="special-test"
              :data-source="dataSource"
            />
          </div>
        </a-tab-pane>
        <a-tab-pane key="3" tab="Examinations" force-render>
          <div class="colored-table">
            <AppScreeningDataTable
              status="examination"
              :data-source="dataSource"
            />
          </div>
        </a-tab-pane>
        <a-tab-pane key="4" tab="Ultrasound Scan" force-render>
          <div class="colored-table">
            <AppScreeningDataTable
              status="ultrasound"
              :data-source="dataSource"
            />
          </div>
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
import AppScreeningDataTable from '@/components/admin/patient/key-service/wellness-nutrition/AppScreeningDataTable'
import AppInput from '@/components/AppInput'
import AppSelect from '@/components/AppSelect'

export default {
  name: 'AppScreeningTab',
  components: {
    AppScreeningDataTable,
    AppInput,
    AppSelect,
  },
  data() {
    return {
      activeKey: '1',
      filterObj: {},
      dataSource: [],
    }
  },
}
</script>
