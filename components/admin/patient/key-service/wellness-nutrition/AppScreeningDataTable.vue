<template>
  <div class="colored-table">
    <a-table
      :columns="columns"
      :data-source="stringToObject"
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
    stringToObject() {
      const newArray = this.dataSource.map((rcd, i) => {
        return { testName: rcd, sn: i + 1 }
      })
      return newArray
    },
    columns() {
      const columns = [
        {
          title: 'S/N',
          dataIndex: 'sn',
          scopedSlots: { customRender: 'sn' },
          width: '10%',
        },
        {
          title: 'TEST NAME',
          dataIndex: 'testName',
          scopedSlots: { customRender: 'testName' },
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
