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
  name: 'AppTestDataTable',
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
          title: 'Test ID',
          dataIndex: 'testId',
          scopedSlots: { customRender: 'testId' },
        },
        {
          title: 'Case Associated',
          dataIndex: 'caseAssociated',
          scopedSlots: { customRender: 'caseAssociated:' },
        },
        {
          title: 'Prescribed By',
          dataIndex: 'prescribedBy',
          scopedSlots: { customRender: 'prescribedBy' },
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
