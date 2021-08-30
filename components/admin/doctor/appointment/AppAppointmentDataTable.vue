<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :pagination="pagination"
      :row-key="(record) => record.id"
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
        {{ `${record.patient.first_name} ${record.patient.last_name}` }}
      </template>
      <template slot="description" slot-scope="text, record">
        {{ record.specialty ? record.specialty.name : null }}
      </template>
      <template slot="time" slot-scope="text, record">
        {{ formatTime(record.time) }}
      </template>
      <template slot="operation" slot-scope="text, record">
        <div style="text-align: right">
          <a-button-group class="link-group">
            <a-button
              class="table__btn"
              type="link"
              @click="$emit('showAppointmentModal', record)"
              ><img src="@/assets/images/admin/table-view.png" alt="view"
            /></a-button>
            <a-button
              v-if="record.status === 'PENDING'"
              type="primary"
              class="table__btn"
              @click="$emit('acceptAppointmentHandler', record)"
              >ACCEPT</a-button
            >
          </a-button-group>
        </div>
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
          {
            title: '',
            dataIndex: 'operation',
            scopedSlots: { customRender: 'operation' },
          },
        ]
      } else {
        columns = [
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
