<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :pagination="pagination"
      :row-key="(record) => record.id"
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
      <template slot="time" slot-scope="text, record">
        {{ formatTime(record.time) }}
      </template>
    </a-table>
  </div>
</template>
<script>
import moment from 'moment'
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
        },
        {
          title: 'Patient Name',
          dataIndex: 'patientName',
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
    formatTime(time) {
      return moment(time).format('HH:mm:ss')
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
