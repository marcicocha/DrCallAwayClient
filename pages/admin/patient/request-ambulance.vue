<template>
  <div>
    <div>
      <AppTitleDivider title="Request an Ambulance" />
      <div class="admin-wrapper">
        <a-form>
          <a-row type="flex" :gutter="16">
            <a-col :span="12">
              <AppInput
                v-model="requestObj.pickupAddress"
                label="Pickup Address"
                placeholder="Enter your location"
                name="pickup address"
              />
            </a-col>
            <a-col :span="12">
              <AppInput
                v-model="requestObj.phoneNumber"
                label="Phone Number"
                placeholder="Enter your phone number"
                name="value"
              />
            </a-col>
            <a-col :span="24">
              <AppInput
                v-model="requestObj.additionalInformation"
                label="Additional Information"
                placeholder="Please enter any information that can be helpful for this request"
                name="additional information"
              />
            </a-col>
          </a-row>
          <br />
          <div class="t-c">
            <AppButton
              type="primary"
              :block="false"
              :loading="isLoading"
              class="admin-button"
              @click="submitHandler"
              >CALLUP</AppButton
            >
          </div>
        </a-form>
      </div>
    </div>
    <br />
    <br />
    <AppTabs v-model="activeKey">
      <template slot="default">
        <a-tab-pane key="1" tab="Pending Requests" force-render>
          <AppAmbulanceDataTable :status="pending" :data-source="dataSource" />
        </a-tab-pane>
        <a-tab-pane key="2" tab="Active Requests">
          <AppAmbulanceDataTable :status="active" :data-source="dataSource" />
        </a-tab-pane>
        <a-tab-pane key="3" tab="Completed Requests">
          <AppAmbulanceDataTable
            :status="completed"
            :data-source="dataSource"
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
import AppAmbulanceDataTable from '@/components/admin/patient/ambulance/AppAmbulanceDataTable'
import AppTitleDivider from '@/components/AppTitleDivider'
export default {
  layout: 'dashboard',
  components: {
    AppTabs,
    AppInput,
    AppSelect,
    AppAmbulanceDataTable,
    AppTitleDivider,
  },
  data() {
    return {
      activeKey: '1',
      filterObj: {},
      dataSource: [],
      requestObj: {},
      isLoading: false,
    }
  },
  methods: {
    submitHandler() {
      console.log('CLICKED')
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
