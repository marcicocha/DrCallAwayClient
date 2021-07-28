<template>
  <div>
    <p class="page_heading">CALLUPS</p>
    <AppTabs v-model="activeKey" @tabClick="changeTabHandler">
      <template slot="default">
        <a-tab-pane key="1" tab="Pending Requests" force-render>
          <AppBookingDataTable
            status="PENDING"
            :data-source="allBooking"
            @showBookingModal="showBookingModal"
            @acceptBookingHandler="acceptBookingHandler"
          />
        </a-tab-pane>
        <a-tab-pane key="2" tab="Active Requests">
          <AppBookingDataTable
            status="ACTIVE"
            :data-source="allBooking"
            @showBookingModal="showBookingModal"
          />
        </a-tab-pane>
        <a-tab-pane key="3" tab="Completed Requests">
          <AppBookingDataTable
            status="COMPLETED"
            :data-source="allBooking"
            @showBookingModal="showBookingModal"
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
    <a-modal
      :visible="modalIsVisible"
      width="420px"
      :confirm-loading="confirmLoading"
      :footer="null"
      :destroy-on-close="true"
      :mask-style="{ background: 'rgba(61, 12, 60, 0.9)' }"
      centered
      @cancel="closeModal"
    >
      <div>
        <h6 class="t-c">Ambulance CallUp</h6>

        <br />
        <div class="t-c">
          <AppButton
            type="primary"
            :block="false"
            :loading="isLoading"
            class="admin-button"
            @click="submitHandler"
            >COMPLETE</AppButton
          >
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import AppTabs from '@/components/AppTabs'
import AppInput from '@/components/AppInput'
import AppSelect from '@/components/AppSelect'
import AppBookingDataTable from '@/components/admin/nurse/AppBookingDataTable'

export default {
  components: {
    AppTabs,
    AppInput,
    AppSelect,
    AppBookingDataTable,
  },
  layout: 'dashboard',
  data() {
    return {
      activeKey: '1',
      filterObj: {},
      modalIsVisible: false,
      currentBooking: {},
      confirmLoading: false,
      isLoading: false,
      status: 'PENDING',
    }
  },
  computed: {
    ...mapState({
      allBooking: (state) => state.bookingModule.bookingList,
    }),
  },
  mounted() {
    this.changeTabHandler('1')
  },
  methods: {
    showBookingModal(record) {
      this.currentBooking = record
      this.modalIsVisible = true
    },
    closeModal() {
      this.modalIsVisible = false
    },
    async submitHandler() {
      try {
        const user = JSON.parse(localStorage.getItem('user'))
        const config = {
          headers: { Authorization: `Bearer ${user.token.token}` },
        }
        await this.$axios.$patch(
          `/nurse/complete/booking/${this.currentBooking.id}`,
          this.currentBooking.id,
          config
        )
        this.$notification.success({
          message: 'Success',
          description: 'Request Completed',
        })
        this.changeTabHandler('3')
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
    acceptBookingHandler(record) {
      const $this = this
      this.$confirm({
        title: 'Are you sure you want to accept this Appointment?',
        content: `With ID: ${record.id}`,
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        async onOk() {
          // vm.showModal(false)
          try {
            const user = JSON.parse(localStorage.getItem('user'))
            const config = {
              headers: { Authorization: `Bearer ${user.token.token}` },
            }
            await $this.$axios.$patch(
              `/nurse/accept/booking/${record.id}`,
              record.id,
              config
            )
            $this.$notification.success({
              message: 'Success',
              description: 'Booking Accepted Successfully',
            })
            $this.changeTabHandler('2')
          } catch (e) {
            const { default: errorHandler } = await import(
              '@/utils/errorHandler'
            )
            errorHandler(e).forEach((msg) => {
              $this.$notification.error({
                message: 'Error',
                description: msg,
              })
            })
          }
        },
        onCancel() {},
      })
    },
    async changeTabHandler(key) {
      if (key === '1') {
        this.status = 'PENDING'
      }
      if (key === '2') {
        this.status = 'ACCEPTED'
      }
      if (key === '3') {
        this.status = 'COMPLETED'
      }
      try {
        const obj = {
          ...this.filterObj,
          status: this.status,
        }
        await this.getAllBooking(obj)
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
      getAllBooking: 'bookingModule/GET_BOOKING',
    }),
  },
}
</script>
<style lang="scss" scoped>
h6 {
  color: $dark-purple;
}
</style>
