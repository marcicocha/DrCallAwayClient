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
            <AppPayment
              :user-obj="getUserObject(record.price)"
              @callback="callback($event, record)"
            >
              SELECT
            </AppPayment>
          </a-button-group>
        </div>
      </template>
    </a-table>
  </div>
</template>
<script>
import AppPayment from '@/components/AppPayment.vue'

export default {
  name: 'AppSelectAmbulanceDataTable',
  components: {
    AppPayment,
  },
  props: {
    pagination: {
      type: Boolean,
      default: true,
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
          dataIndex: 'first_name',
          scopedSlots: { customRender: 'first_name' },
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
    callback(res, record) {
      this.$emit('callback', res, record)
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
