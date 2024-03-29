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
    <AppTabs v-model="activeKey" @tabClick="changeTabHandler">
      <template slot="default">
        <a-tab-pane key="1" tab="Pending Requests" force-render>
          <AppAmbulanceDataTable :data-source="allCallUp" />
        </a-tab-pane>
        <a-tab-pane key="2" tab="Active Requests">
          <AppAmbulanceDataTable
            :data-source="allCallUp"
            @acceptHandler="acceptHandler"
          />
        </a-tab-pane>
        <a-tab-pane key="3" tab="Completed Requests">
          <AppAmbulanceDataTable :data-source="allCallUp" />
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
    <a-modal
      :visible="modalIsVisible"
      width="600px"
      :confirm-loading="confirmLoading"
      :footer="null"
      :destroy-on-close="true"
      :mask-style="{ background: 'rgba(61, 12, 60, 0.9)' }"
      centered
      @cancel="closeModal"
    >
      <div>
        <h6 class="t-c">Ambulance Providers Near You</h6>
        <a-divider />
        <AppSelectAmbulanceDataTable
          :request-obj="requestObj"
          @onClose="onClose"
        />
      </div>
    </a-modal>
  </div>
</template>
<script>
import { ValidationObserver } from 'vee-validate'
import { mapActions, mapState } from 'vuex'
import AppTabs from '@/components/AppTabs'
import AppInput from '@/components/AppInput'
import AppSelect from '@/components/AppSelect'
import AppAmbulanceDataTable from '@/components/admin/patient/ambulance/AppAmbulanceDataTable'
import AppTitleDivider from '@/components/AppTitleDivider'
import AppSelectAmbulanceDataTable from '@/components/admin/patient/ambulance/AppSelectAmbulanceDataTable'
export default {
  components: {
    AppTabs,
    AppInput,
    AppSelect,
    AppAmbulanceDataTable,
    AppTitleDivider,
    ValidationObserver,
    AppSelectAmbulanceDataTable,
  },
  layout: 'dashboard',
  data() {
    return {
      activeKey: '1',
      filterObj: {},
      requestObj: {},
      isLoading: false,
      status: 'PENDING',
      modalIsVisible: false,
      confirmLoading: false,
      selectAmbulance: true,
    }
  },
  computed: {
    ...mapState({
      allCallUp: (state) => state.ambulanceModule.ambulances,
    }),
  },
  mounted() {
    this.changeTabHandler('1')
  },
  methods: {
    closeModal() {
      this.modalIsVisible = false
    },
    onClose() {
      this.closeModal()
      requestAnimationFrame(() => {
        this.$refs.observer.reset()
        this.requestObj = {}
        this.isLoading = false
        this.modalIsVisible = false
      })
    },
    async acceptHandler(record) {
      try {
        const user = JSON.parse(localStorage.getItem('user'))
        const config = {
          headers: { Authorization: `Bearer ${user.token.token}` },
        }
        await this.$axios.$patch(
          `ambulance/complete/callup/${record.id}`,
          record.id,
          config
        )
        this.$notification.success({
          message: 'Success',
          description: 'Request Completed',
        })
        this.changeTabHandler('3')
        this.activeKey = '3'
      } catch (e) {
        const { default: errorHandler } = await import('@/utils/errorHandler')
        errorHandler(e).forEach((msg) => {
          this.$notification.error({
            message: 'Error',
            description: msg,
          })
        })
      }
    },
    async submitHandler() {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      this.modalIsVisible = true
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
        await this.getAllCallUpFile(obj)
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
      getAllCallUpFile: 'ambulanceModule/GET_AMBULANCE',
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
