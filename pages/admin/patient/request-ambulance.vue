<template>
  <div>
    <div>
      <AppTitleDivider title="Request an Ambulance" />
      <div class="admin-wrapper">
        <a-form>
          <ValidationObserver ref="observer" tag="div">
            <a-row type="flex" :gutter="16">
              <a-col :span="12">
                <AppInput
                  v-model="requestObj.pick_up_address"
                  label="Pickup Address"
                  placeholder="Enter your location"
                  name="pickup address"
                  rules="required"
                  required
                />
              </a-col>
              <a-col :span="12">
                <AppInput
                  v-model="requestObj.phone_number"
                  label="Phone Number"
                  placeholder="Enter your phone number"
                  name="value"
                  rules="required"
                  required
                />
              </a-col>
              <a-col :span="24">
                <AppInput
                  v-model="requestObj.additional_information"
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
          </ValidationObserver>
        </a-form>
      </div>
    </div>
    <br />
    <br />
    <AppTabs v-model="activeKey">
      <template slot="default">
        <a-tab-pane key="1" tab="Pending Requests" force-render>
          <AppAmbulanceDataTable status="pending" :data-source="dataSource" />
        </a-tab-pane>
        <a-tab-pane key="2" tab="Active Requests">
          <AppAmbulanceDataTable status="active" :data-source="dataSource" />
        </a-tab-pane>
        <a-tab-pane key="3" tab="Completed Requests">
          <AppAmbulanceDataTable status="completed" :data-source="dataSource" />
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
import { ValidationObserver } from 'vee-validate'
import { mapActions } from 'vuex'
import AppTabs from '@/components/AppTabs'
import AppInput from '@/components/AppInput'
import AppSelect from '@/components/AppSelect'
import AppAmbulanceDataTable from '@/components/admin/patient/ambulance/AppAmbulanceDataTable'
import AppTitleDivider from '@/components/AppTitleDivider'
export default {
  components: {
    AppTabs,
    AppInput,
    AppSelect,
    AppAmbulanceDataTable,
    AppTitleDivider,
    ValidationObserver,
  },
  layout: 'dashboard',
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
    async submitHandler() {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      this.isLoading = true
      try {
        const response = await this.submitAmbulanceHandler(this.requestObj)
        this.$notification.success({
          message: 'Success',
          description: response.successMessage,
          duration: 4000,
        })
        this.isLoading = false
      } catch (err) {
        this.isLoading = false
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
      submitAmbulanceHandler: 'ambulanceModule/ADD_AMBULANCE',
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
