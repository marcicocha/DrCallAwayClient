<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :pagination="pagination"
      :custom-row="customRow"
    >
      <template slot="status" slot-scope="text, record">
        <div
          :class="{
            blue: record.status === 'PENDING',
            green: record.status === 'COMPLETED',
            red: record.status === 'DECLINED',
          }"
        >
          {{ record.status }}
        </div>
      </template>
      <template slot="prescriptionBy" slot-scope="text, record">
        <div>
          {{ `${record.partners.first_name} ${record.partners.last_name}` }}
        </div>
      </template>
      <template slot="updated_at" slot-scope="text, record">
        {{ formatDate(record.updated_at) }}
      </template>
    </a-table>
  </div>
</template>
<script>
import moment from 'moment'

export default {
  name: 'AppPrescriptionDataTable',
  props: {
    dataSource: {
      type: Array,
      default: () => [],
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
          title: 'Prescription ID',
          dataIndex: 'case_file_id',
          scopedSlots: { customRender: 'case_file_id' },
        },
        {
          title: 'Prescription Title',
          dataIndex: 'ailment',
          scopedSlots: { customRender: 'ailment' },
        },
        {
          title: 'Presecription By',
          dataIndex: 'prescriptionBy',
          scopedSlots: { customRender: 'prescriptionBy' },
        },
        {
          title: 'Prescription Date',
          dataIndex: 'prescriptionDate',
          scopedSlots: { customRender: 'updated_at' },
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
    formatDate(date) {
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
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
