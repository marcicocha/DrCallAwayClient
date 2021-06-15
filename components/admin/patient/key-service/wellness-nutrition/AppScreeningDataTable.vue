<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :pagination="false"
      :row-key="(record) => record.id"
    />
  </div>
</template>
<script>
export default {
  name: 'AppScreeningDataTable',
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
          title: 'S/N',
          dataIndex: 'sn',
          scopedSlots: { customRender: 'sn' },
        },
        {
          title: 'TEST NAME',
          dataIndex: 'testName',
          scopedSlots: { customRender: 'testName' },
        },
        {
          title: 'PRICE',
          dataIndex: 'price',
          scopedSlots: { customRender: 'price' },
        },
        {
          title: 'SELECT',
          dataIndex: 'select',
          scopedSlots: { customRender: 'select' },
        },
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
