<template>
  <div class="colored-table">
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :pagination="pagination"
    >
      <template slot="sn" slot-scope="text, record, index">
        {{ index + 1 }}
      </template>
      <template slot="operation" slot-scope="text, record">
        <div style="text-align: right">
          <a-button-group class="link-group">
            <a-button
              type="primary"
              class="table__btn"
              @click="selectHandler(record)"
              >SELECT</a-button
            >
          </a-button-group>
        </div>
      </template>
    </a-table>
    <a-modal
      :visible="selectedAmbulanceModalIsVisible"
      width="600px"
      :footer="null"
      :destroy-on-close="true"
      :mask-style="{ background: 'rgba(61, 12, 60, 0.9)' }"
      centered
      @cancel="closeModal"
    >
      <div>
        <h6 class="t-c">Ambulance Request</h6>
        <a-divider />
        <AppAmbulanceSelectedTable
          :user="user"
          :request-obj="requestObj"
          :selected-ambulance-obj="selectedAmbulanceObj"
          @closeModal="closeModal"
          @onClose="onClose"
        />
      </div>
    </a-modal>
  </div>
</template>
<script>
import AppAmbulanceSelectedTable from '@/components/admin/patient/ambulance/AppAmbulanceSelectedTable'
export default {
  name: 'AppSelectAmbulanceDataTable',
  components: {
    AppAmbulanceSelectedTable,
  },
  props: {
    pagination: {
      type: Boolean,
      default: true,
    },
    requestObj: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    const userObject = JSON.parse(localStorage.getItem('user'))
    return {
      dataSource: [],
      user: {
        email: userObject.email,
        firstName: userObject.first_name,
        lastName: userObject.last_name,
        amount: this.totalPrice,
      },
      selectedAmbulanceModalIsVisible: false,
      selectedAmbulanceObj: {},
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
          title: 'AMBULANCE NAME',
          dataIndex: 'registered_name',
          scopedSlots: { customRender: 'registered_name' },
        },
        {
          title: 'ADDRESS',
          dataIndex: 'address',
          scopedSlots: { customRender: 'address' },
        },
        {
          title: 'SELECT',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' },
        },
      ]
      return columns
    },
  },
  mounted() {
    this.fetchAmbulanceListHandler()
  },
  methods: {
    onClose() {
      this.closeModal()
      this.$emit('onClose')
    },
    closeModal() {
      this.selectedAmbulanceModalIsVisible = false
    },
    selectHandler(record) {
      this.selectedAmbulanceObj = record
      this.selectedAmbulanceModalIsVisible = true
    },
    getUserObject(price) {
      return {
        ...this.user,
        amount: 1500,
      }
    },
    async fetchAmbulanceListHandler() {
      try {
        const user = JSON.parse(localStorage.getItem('user'))
        const config = {
          headers: { Authorization: `Bearer ${user.token.token}` },
        }
        const { data } = await this.$axios.$get('ambulance', config)
        this.dataSource = data
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
  },
}
</script>
<style lang="scss" scoped>
.blue {
  color: #0031a5;
}
.green {
  color: #2ec114;
}
.red {
  color: #e74353;
}
</style>
