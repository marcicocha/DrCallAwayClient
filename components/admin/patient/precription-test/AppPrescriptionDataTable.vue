<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :pagination="false"
      :custom-row="customRow"
    >
      <template slot="status" slot-scope="text, record">
        <div
          :class="{
            blue: record.status === 'Active',
            green: record.status === 'Completed',
            red: record.status === 'Pending',
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
  name: 'AppPrescriptionDataTable',
  props: {
    status: {
      type: String,
      default: '',
    },
    dataSource: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    columns() {
      const columns = [
        {
          title: 'Presecription ID',
          dataIndex: 'presecriptionId',
          scopedSlots: { customRender: 'presecriptionId' },
        },
        {
          title: 'Prescription Title',
          dataIndex: 'prescriptionTitle',
          scopedSlots: { customRender: 'prescriptionTitle' },
        },
        {
          title: 'Presecription By',
          dataIndex: 'presecriptionBy',
          scopedSlots: { customRender: 'presecriptionBy' },
        },
        {
          title: 'Prescription Date',
          dataIndex: 'prescriptionDate',
          scopedSlots: { customRender: 'prescriptionDate' },
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
    customRow(record) {
      return {
        on: {
          click: (event) => {
            this.$emit('showPrescriptionModal', record)
          },
        },
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
