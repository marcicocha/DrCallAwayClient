<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :pagination="status === 'doctor'"
      :row-key="(record) => record.caseId"
    >
      <template slot="status" slot-scope="text, record">
        <div
          :class="{
            blue: record.status === 'ACTIVE',
            green: record.status === 'COMPLETED',
            red: record.status === 'PENDING',
          }"
        >
          {{ record.status }}
        </div>
      </template>
      <template slot="date" slot-scope="text, record">
        {{ formatDate(record.created_at) }}
      </template>
      <template slot="doctor" slot-scope="text, record">
        {{
          record.doctor
            ? `${record.doctor.first_name} ${record.doctor.last_name}`
            : 'Unassigned'
        }}
      </template>
      <template slot="patient" slot-scope="text, record">
        {{
          record.patient
            ? `${record.patient.first_name} ${record.patient.last_name}`
            : ''
        }}
      </template>
      <template slot="operation" slot-scope="text, record">
        <div style="text-align: right">
          <a-button-group class="link-group">
            <a-button
              v-if="record.status === 'ACTIVE'"
              type="link"
              class="table__btn"
              @click="$emit('showChatDrawer', record)"
              ><img src="@/assets/images/admin/table-comment.png" alt="comment"
            /></a-button>
            <a-button
              class="table__btn"
              type="link"
              @click="viewCaseFile(record)"
              ><img src="@/assets/images/admin/table-view.png" alt="view"
            /></a-button>
          </a-button-group>
        </div>
      </template>
    </a-table>
    <div class="paginationCover">
      <AppPagination
        v-if="status === 'patient'"
        show-size-changer
        :page-size-options="pageSizeOptions"
        :default-current="0"
        :total="pagination.totalElements"
        @change="paginationChangeHandler"
        @showSizeChange="onShowSizeChange"
      />
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import AppPagination from '@/components/AppPagination.vue'

export default {
  name: 'AppCaseFileDataTable',
  components: {
    AppPagination,
  },
  props: {
    dataSource: {
      type: Array,
      default: () => [],
    },
    // pagination: {
    //   type: Boolean,
    //   default: true,
    // },
    filterObj: {
      type: Object,
      default: () => {},
    },
    columns: {
      type: Array,
      default: () => [],
    },
    pageSizeOptions: {
      type: Array,
      default: () => ['10', '20', '30', '40', '50'],
    },
    pagination: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    viewCaseFile(record) {
      this.$emit('showCaseFile', record)
    },
    formatDate(date) {
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    paginationChangeHandler(pageNumber, pageSize) {
      this.$emit('paginationChangeHandler', pageNumber, pageSize)
    },
    onShowSizeChange(current, pageSize) {
      this.$emit('onShowSizeChange', current, pageSize)
    },
  },
}
</script>
