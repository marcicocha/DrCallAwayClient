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
            blue: record.status === 'ACTIVE',
            green: record.status === 'BOOKED',
            red: record.status === 'PENDING',
          }"
        >
          {{ record.status }}
        </div>
      </template>
      <template slot="time" slot-scope="text, record">
        {{ formatTime(record.time) }}
      </template>
      <template slot="date" slot-scope="text, record">
        {{ formatDate(record.date) }}
      </template>
      <template slot="operation" slot-scope="text, record">
        <div style="text-align: right">
          <a-button-group class="link-group">
            <a-button
              class="table__btn"
              type="link"
              @click="$emit('showBookingModal', record)"
              ><img src="@/assets/images/admin/table-view.png" alt="view"
            /></a-button>
            <a-button
              v-if="record.status === 'PENDING'"
              type="primary"
              class="table__btn"
              @click="$emit('acceptBookingHandler', record)"
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
  name: 'AppBookingDataTable',
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
        },
        {
          title: 'Description',
          dataIndex: 'description',
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
      return columns
    },
  },
  methods: {
    customRow(record) {
      return {
        on: {
          click: (event) => {
            this.$emit('showBookingModal', record)
          },
        },
      }
    },
    formatTime(time) {
      return moment(time).format('HH:mm:ss')
    },
    formatDate(date) {
      return moment(date).format('YYYY/MM/DD')
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
