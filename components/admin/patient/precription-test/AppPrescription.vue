<template>
  <div>
    <h6>PRECRIPTIONS</h6>
    <AppTabs v-model="activeKey">
      <template slot="default">
        <a-tab-pane key="1" tab="Pending Prescription" force-render>
          <AppPrescriptionDataTable
            :status="pending"
            :data-source="dataSource1"
          />
        </a-tab-pane>

        <a-tab-pane key="2" tab="Completed Prescription">
          <AppPrescriptionDataTable
            :status="completed"
            :data-source="dataSource2"
          />
        </a-tab-pane>
        <a-tab-pane key="3" tab="Declined Prescription">
          <AppPrescriptionDataTable
            :status="booked"
            :data-source="dataSource3"
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
  </div>
</template>
<script>
import AppTabs from '@/components/AppTabs'
import AppInput from '@/components/AppInput'
import AppSelect from '@/components/AppSelect'
import AppPrescriptionDataTable from '@/components/admin/patient/precription-test/AppPrescriptionDataTable'

export default {
  name: 'AppPrescription',
  components: {
    AppTabs,
    AppInput,
    AppSelect,
    AppPrescriptionDataTable,
  },
  data() {
    return {
      activeKey: '1',
      filterObj: {},
      dataSource1: [
        {
          presecriptionId: '#000001',
          presecriptionTitle: 'Prescription for Strong Headache',
          prescribedBy: 'Dr Yomi',
          prescriptionDate: '30th March, 2021',
          status: 'Pending',
        },
      ],
      dataSource2: [
        {
          presecriptionId: '#000001',
          presecriptionTitle: 'Prescription for Strong Headache',
          prescribedBy: 'Dr Yomi',
          prescriptionDate: '30th March, 2021',
          status: 'Active',
        },
      ],
      dataSource3: [
        {
          presecriptionId: '#000001',
          caseAssociated: 'Prescription for Strong Headache',
          prescribedBy: 'Dr Yomi',
          prescriptionDate: '30th March, 2021',
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
