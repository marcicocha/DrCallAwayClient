<template>
  <div>
    <p class="page_heading">CALLUPS</p>
    <AppTabs v-model="activeKey" @tabClick="changeTabHandler">
      <template slot="default">
        <a-tab-pane key="1" tab="Pending Requests" force-render>
          <AppCallUpDataTable
            status="PENDING"
            :data-source="allCallUp"
            @showCallUpModal="showCallUpModal"
            @acceptCallUpHandler="acceptCallUpHandler"
          />
        </a-tab-pane>
        <a-tab-pane key="2" tab="Active Requests">
          <AppCallUpDataTable
            status="ACTIVE"
            :data-source="allCallUp"
            @showCallUpModal="showCallUpModal"
          />
        </a-tab-pane>
        <a-tab-pane key="3" tab="Completed Requests">
          <AppCallUpDataTable
            status="COMPLETED"
            :data-source="allCallUp"
            @showCallUpModal="showCallUpModal"
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
        <h6 class="t-c">Ambulance CallUp</h6>
        <a-table
          :columns="columns"
          :data-source="callList"
          :pagination="false"
          :row-key="(record) => record.id"
        >
          <template slot="sn" slot-scope="text, record, index">
            {{ index + 1 }}
          </template>
          <template slot="name" slot-scope="text, record">
            {{ `${record.user.first_name} ${record.user.last_name}` }}
          </template>
        </a-table>
        <br />
      </div>
    </a-modal>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import AppTabs from '@/components/AppTabs'
import AppInput from '@/components/AppInput'
import AppSelect from '@/components/AppSelect'
import AppCallUpDataTable from '@/components/admin/ambulance/AppCallUpDataTable'

export default {
  components: {
    AppTabs,
    AppInput,
    AppSelect,
    AppCallUpDataTable,
  },
  layout: 'dashboard',
  data() {
    return {
      activeKey: '1',
      filterObj: {},
      modalIsVisible: false,
      currentCallUp: {},
      confirmLoading: false,
      isLoading: false,
      status: 'PENDING',
    }
  },
  computed: {
    columns() {
      const columns = [
        {
          title: 'S/N',
          dataIndex: 'sn',
          scopedSlots: { customRender: 'sn' },
        },
        {
          title: 'REQUESTER NAME',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' },
        },
        {
          title: 'PICKUP ADDRESS',
          dataIndex: 'pick_up_address',
        },
        {
          title: 'PHONE NUMBER',
          dataIndex: 'phone_number',
        },
      ]
      return columns
    },
    callList() {
      return [{ ...this.currentCallUp }]
    },
    ...mapState({
      allCallUp: (state) => state.callUpModule.callUpList,
    }),
  },
  mounted() {
    this.changeTabHandler('1')
  },
  methods: {
    showCallUpModal(record) {
      this.currentCallUp = record
      this.modalIsVisible = true
    },
    closeModal() {
      this.modalIsVisible = false
    },
    acceptCallUpHandler(record) {
      const $this = this
      this.$confirm({
        title: 'Are you sure you want to accept this Requests?',
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
              `ambulance/accept/callup/${record.id}`,
              record.id,
              config
            )
            $this.$notification.success({
              message: 'Success',
              description: 'Request Accepted Successfully',
            })
            $this.changeTabHandler('2')
            $this.activeKey = '2'
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
        await this.getAllCallUp(obj)
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
      getAllCallUp: 'callUpModule/GET_CALL_UP',
    }),
  },
}
</script>
<style lang="scss" scoped>
h6 {
  color: $dark-purple;
}
</style>
