<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="allCaseFiles"
      :pagination="pagination"
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
      <template slot="doctor" slot-scope="text, record">
        {{ record.doctor ? record.doctor : 'Unassigned' }}
      </template>
      <template slot="operation" slot-scope="text, record">
        <div style="text-align: right">
          <a-button-group class="link-group">
            <a-button
              v-if="record.status !== 'Pending'"
              type="link"
              class="table__btn"
              @click="$emit('showDeleteConfirm', record)"
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
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'AppCaseFileDataTable',
  props: {
    status: {
      type: String,
      default: undefined,
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
          title: 'Case ID',
          dataIndex: 'id',
          scopedSlots: { customRender: 'id' },
        },
        {
          title: 'Consultant Name',
          dataIndex: 'doctor',
          scopedSlots: { customRender: 'doctor' },
        },
        {
          title: 'Complaint',
          dataIndex: 'initial_complain',
          scopedSlots: { customRender: 'initial_complain' },
        },
        {
          title: 'Date Added',
          dataIndex: 'created_at',
          scopedSlots: { customRender: 'created_at' },
        },
        {
          title: 'Status',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' },
        },
        {
          title: '',
          dataIndex: 'operation1',
          scopedSlots: { customRender: 'operation' },
        },
      ]
      return columns
    },
    ...mapState({
      allCaseFiles: (state) => state.caseFileModule.caseFiles,
    }),
  },
  async mounted() {
    try {
      const obj = {
        ...this.filterObj,
        status: this.status,
      }
      await this.getAllCaseFile(obj)
    } catch (err) {
      const { default: errorHandler } = await import('@/utils/errorHandler')
      errorHandler(err).forEach((msg) => {
        this.$notification.error({
          message: 'Error',
          description: msg,
          duration: 4000,
        })
      })
    }
  },
  methods: {
    viewCaseFile(record) {
      this.$emit('showCaseFile', record)
    },
    ...mapActions({
      getAllCaseFile: 'caseFileModule/GET_CASE_FILE',
    }),
  },
}
</script>
