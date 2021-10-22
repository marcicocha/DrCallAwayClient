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
            blue: record.status === 'ACTIVE',
            green: record.status === 'COMPLETED',
            red: record.status === 'PENDING',
          }"
        >
          {{ record.status }}
        </div>
      </template>
      <template slot="caseId" slot-scope="text, record">
        {{ record.caseFile.case_id }}
      </template>
      <template slot="prescribedBy" slot-scope="text, record">
        <div>
          {{ `${record.doctor.first_name} ${record.doctor.last_name}` }}
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
  },
  computed: {
    columns() {
      const columns = [
        {
          title: 'Test ID',
          dataIndex: 'id',
          scopedSlots: { customRender: 'id' },
        },
        {
          title: 'Case Associated',
          dataIndex: 'caseId',
          scopedSlots: { customRender: 'caseId' },
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
