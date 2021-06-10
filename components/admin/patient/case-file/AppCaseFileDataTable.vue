<template>
  <div>
    <a-table :columns="columns" :data-source="dataSource" :pagination="false">
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
  name: 'AppCaseFileDataTable',
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
          title: 'Case ID',
          dataIndex: 'caseId',
          scopedSlots: { customRender: 'caseId' },
        },
        {
          title: 'Consultant Name',
          dataIndex: 'consultantName',
          scopedSlots: { customRender: 'consultantName' },
        },
        {
          title: 'Complaint',
          dataIndex: 'complaint',
          scopedSlots: { customRender: 'complaint' },
        },
        {
          title: 'Date Added',
          dataIndex: 'dateAdded',
          scopedSlots: { customRender: 'dateAdded' },
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
