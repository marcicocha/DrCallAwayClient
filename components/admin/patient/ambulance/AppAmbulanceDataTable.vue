<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="allCallUp"
      :pagination="pagination"
    >
      <template slot="status" slot-scope="text, record">
        <div
          :class="{
            blue: record.status === 'ACTIVE',
            green: record.status === 'CCOMPLETED',
            red: record.status === 'PENDING',
          }"
        >
          {{ record.status }}
        </div>
      </template>
    </a-table>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'AppAmbulanceDataTable',
  props: {
    status: {
      type: String,
      default: '',
    },
    filterObj: {
      type: Object,
      default: () => {},
    },
    pagination: {
      type: Boolean,
      default: true,
    },
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
          title: 'Pickup Address',
          dataIndex: 'pick_up_address',
          scopedSlots: { customRender: 'pick_up_address' },
        },
        {
          title: 'Phone Number',
          dataIndex: 'phone_number',
          scopedSlots: { customRender: 'phone_number' },
        },
        {
          title: 'Additional Information',
          dataIndex: 'additional_information',
          scopedSlots: { customRender: 'additional_information' },
        },
        {
          title: 'Status',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' },
        },
        // {
        //  title: '',
        //  dataIndex: 'operation1',
        //  scopedSlots: { customRender: 'operation' },
        // },
      ]
      return columns
    },
    ...mapState({
      allCallUp: (state) => state.ambulanceModule.ambulances,
    }),
  },
  async mounted() {
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
  methods: {
    viewCallUp(record) {
      this.$emit('showCallUp', record)
    },
    ...mapActions({
      getAllCallUpFile: 'ambulanceModule/GET_AMBULANCE',
    }),
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
