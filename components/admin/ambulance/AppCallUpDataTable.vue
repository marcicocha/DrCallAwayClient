<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :pagination="pagination"
      :row-key="(record) => record.id"
    >
      <template slot="sn" slot-scope="text, record, index">
        {{ index + 1 }}
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
      <template slot="operation" slot-scope="text, record">
        <div style="text-align: right">
          <a-button-group class="link-group">
            <a-button
              class="table__btn"
              type="link"
              @click="$emit('showCallUpModal', record)"
              ><img src="@/assets/images/admin/table-view.png" alt="view"
            /></a-button>
            <a-button
              v-if="record.status === 'PENDING'"
              type="primary"
              class="table__btn"
              @click="$emit('acceptCallUpHandler', record)"
              >ACCEPT</a-button
            >
          </a-button-group>
        </div>
      </template>
    </a-table>
  </div>
</template>
<script>
export default {
  name: 'AppCallUpDataTable',
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
      let columns
      if (!this.dashboard) {
        columns = [
          {
            title: 'S/N',
            dataIndex: 'sn',
            scopedSlots: { customRender: 'sn' },
          },
          {
            title: 'Pickup Address',
            dataIndex: 'pick_up_address',
          },
          {
            title: 'Phone Number',
            dataIndex: 'phone_number',
          },
          {
            title: 'Status',
            dataIndex: 'status',
            scopedSlots: { customRender: 'status' },
          },
          {
            title: '',
            dataIndex: 'operation',
            scopedSlots: { customRender: 'operation' },
          },
        ]
      } else {
        columns = [
          {
            title: 'S/N',
            dataIndex: 'sn',
            scopedSlots: { customRender: 'sn' },
          },
          {
            title: 'Pickup Address',
            dataIndex: 'pick_up_address',
          },
          {
            title: 'Phone Number',
            dataIndex: 'phone_number',
          },
          {
            title: 'Status',
            dataIndex: 'status',
            scopedSlots: { customRender: 'status' },
          },
        ]
      }

      return columns
    },
  },
  methods: {
    customRow(record) {
      return {
        on: {
          click: (event) => {
            this.$emit('showCallUpModal', record)
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
