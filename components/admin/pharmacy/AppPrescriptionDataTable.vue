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
      <template slot="prescriptionTitle" slot-scope="text, record">
        {{ `Prescription for ${record.ailment}` }}
      </template>
      <template slot="prescriptionBy" slot-scope="text, record">
        {{ `${record.partners.first_name} ${record.partners.last_name}` }}
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
      <template slot="date" slot-scope="text, record">
        {{ formatDate(record.updated_at) }}
      </template>
      <template slot="operation" slot-scope="text, record">
        <div style="text-align: right">
          <a-button-group class="link-group">
            <a-button
              v-if="record.status === 'PENDING'"
              type="primary"
              class="table__btn"
              @click="$emit('acceptPrescriptionHandler', record)"
              >ACCEPT</a-button
            >
            <a-button
              class="table__btn"
              type="link"
              @click="$emit('showPresciptionModal', record)"
              ><img src="@/assets/images/admin/table-view.png" alt="view"
            /></a-button>
          </a-button-group>
        </div>
      </template>
    </a-table>
  </div>
</template>
<script>
import moment from 'moment'

export default {
  name: 'AppPrescriptionDataTable',
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
      if (this.dashboard) {
        columns = [
          {
            title: 'Prescription ID',
            dataIndex: 'id',
          },
          {
            title: 'Prescription Title',
            dataIndex: 'prescriptionTitle',
            scopedSlots: { customRender: 'prescriptionTitle' },
          },
          {
            title: 'Prescribed By',
            dataIndex: 'prescriptionBy',
            scopedSlots: { customRender: 'prescriptionBy' },
          },
          {
            title: 'Prescription Date',
            dataIndex: 'updated_at',
            scopedSlots: { customRender: 'date' },
          },
          {
            title: 'Status',
            dataIndex: 'status',
            scopedSlots: { customRender: 'status' },
          },
        ]
      } else {
        columns = [
          {
            title: 'Prescription ID',
            dataIndex: 'id',
          },
          {
            title: 'Prescription Title',
            dataIndex: 'prescriptionTitle',
            scopedSlots: { customRender: 'prescriptionTitle' },
          },
          {
            title: 'Prescribed By',
            dataIndex: 'prescriptionBy',
            scopedSlots: { customRender: 'prescriptionBy' },
          },
          {
            title: 'Prescription Date',
            dataIndex: 'updated_at',
            scopedSlots: { customRender: 'date' },
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
      }
      return columns
    },
  },
  methods: {
    customRow(record) {
      return {
        on: {
          click: (event) => {
            this.$emit('showPresciptionModal', record)
          },
        },
      }
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
