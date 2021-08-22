<template>
  <div class="colored-table">
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :pagination="false"
      :row-key="(record) => record.id"
    >
      <template slot="sn" slot-scope="text, record, index">
        {{ index + 1 }}
      </template>
      <template slot="operation" slot-scope="text, record">
        <div>
          <a-checkbox @change="changeHandler($event, record)" />
        </div>
      </template>
    </a-table>
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
          width: '10%',
        },
        {
          title: 'TEST NAME',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' },
        },
        {
          title: 'SELECT',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' },
          align: 'center',
          width: '15%',
        },
      ]
      return columns
    },
  },
  methods: {
    changeHandler(e, record) {
      const rcd = { name: record.name, price: record.amount }
      this.$emit('changeSelectedlistHandler', e, rcd)
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
