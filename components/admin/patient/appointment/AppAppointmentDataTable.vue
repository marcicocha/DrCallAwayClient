<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :pagination="pagination"
      :row-key="(record) => record.appointmentId"
      :custom-row="customRow"
    >
      <template slot="status" slot-scope="text, record">
        <div
          :class="{
            blue: record.status === 'BOOKED',
            green: record.status === 'COMPLETED',
            red: record.status === 'PENDING',
          }"
        >
          {{ record.status }}
        </div>
      </template>
      <template slot="name" slot-scope="text, record">
        {{
          `${record.specialist.user.first_name} ${record.specialist.user.last_name}`
        }}
      </template>
      <template slot="description" slot-scope="text, record">
        {{ record.specialty.name }}
      </template>
    </a-table>
  </div>
</template>
<script>
export default {
  name: 'AppAppointmentDataTable',
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
  },
  computed: {
    columns() {
      const columns = [
        {
          title: 'Appointment ID',
          dataIndex: 'id',
          scopedSlots: { customRender: 'id' },
        },
        {
          title: 'Consultant Name',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' },
        },
        {
          title: 'Description',
          dataIndex: 'description',
          scopedSlots: { customRender: 'description' },
        },
        {
          title: 'Date of Visit',
          dataIndex: 'date',
          scopedSlots: { customRender: 'date' },
        },
        {
          title: 'Time of Visit',
          dataIndex: 'time',
          scopedSlots: { customRender: 'time' },
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
            this.$emit('showAppointmentModal', record)
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
