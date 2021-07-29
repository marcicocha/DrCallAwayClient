<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :pagination="pagination"
      :custom-row="customRow"
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
              v-if="record.status === 'ACCEPTED'"
              type="primary"
              class="table__btn"
              @click="$emit('acceptHandler', record)"
              >COMPLETE</a-button
            >
          </a-button-group>
        </div>
      </template>
    </a-table>
  </div>
</template>
<script>
export default {
  name: 'AppAmbulanceDataTable',
  props: {
    dataSource: {
      type: Array,
      default: () => [],
    },
    filterObj: {
      type: Object,
      default: () => {},
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
          title: 'S/N',
          dataIndex: 'sn',
          scopedSlots: { customRender: 'sn' },
        },
        {
          title: 'Pickup Address',
          dataIndex: 'pick_up_address',
          scopedSlots: { customRender: 'pick_up_address' },
        },
        {
          title: 'Phone Number',
          dataIndex: 'phone_number',
          scopedSlots: { customRender: 'phone_number' },
        },
        {
          title: 'Additional Information',
          dataIndex: 'additional_information',
          scopedSlots: { customRender: 'additional_information' },
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
      return columns
    },
  },
  methods: {
    customRow(record) {
      return {
        on: {
          click: (event) => {
            this.$emit('showAppointmentModal', record)
          },
        },
      }
    },
    viewCallUp(record) {
      this.$emit('showCallUp', record)
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
