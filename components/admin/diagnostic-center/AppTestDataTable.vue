<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :pagination="pagination"
      :row-key="(record) => record.id"
      :custom-row="customRow"
    >
      <template slot="sn" slot-scope="text, record, index">
        {{ index + 1 }}
      </template>
      <template slot="caseId" slot-scope="text, record">
        {{ record.caseFile.case_id }}
      </template>
      <template slot="prescribedBy" slot-scope="text, record">
        <div>
          {{ `${record.doctor.first_name} ${record.doctor.last_name}` }}
        </div>
      </template>
      <template slot="status" slot-scope="text, record">
        <div
          :class="{
            blue: record.status === 'ACCEPTED',
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
  name: 'AppTestDataTable',
  props: {
    dataSource: {
      type: Array,
      default: () => [],
    },
    pagination: {
      type: Boolean,
      default: true,
    },
    filterObj: {
      type: Object,
      default: () => {},
    },
    dashboard: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    columns() {
      const columns = [
        {
          title: 'Test ID',
          dataIndex: 'id',
        },
        {
          title: 'Case Associated',
          dataIndex: 'caseId',
          scopedSlots: { customRender: 'caseId' },
        },
        {
          title: 'Prescribed By',
          dataIndex: 'prescriptionBy',
          scopedSlots: { customRender: 'prescribedBy' },
        },
        {
          title: 'Status',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' },
        },
      ]
      return columns
    },
  },
  methods: {
    customRow(record) {
      return {
        on: {
          click: (event) => {
            this.$emit('showTestModal', record)
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
