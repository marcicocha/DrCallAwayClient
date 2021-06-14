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
          title: 'Prescription ID',
          dataIndex: 'prescriptionId',
          scopedSlots: { customRender: 'prescriptionId' },
        },
        {
          title: 'Prescription Title',
          dataIndex: 'prescriptionTitle',
          scopedSlots: { customRender: 'prescriptionTitle' },
        },
        {
          title: 'Presecription By',
          dataIndex: 'prescriptionBy',
          scopedSlots: { customRender: 'prescriptionBy' },
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
