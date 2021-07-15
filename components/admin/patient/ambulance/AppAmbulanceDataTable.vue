<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :pagination="pagination"
    >
      <template slot="sn" slot-scope="text, record, index">
        {{ index + 1 }}
      </template>
      <template slot="status" slot-scope="text, record">
        <div
          :class="{
            blue: record.status === 'ACTIVE',
            green: record.status === 'COMPLETED',
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
export default {
  name: 'AppAmbulanceDataTable',
  props: {
    dataSource: {
      type: Array,
      default: () => [],
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
  },
  methods: {
    viewCallUp(record) {
      this.$emit('showCallUp', record)
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
