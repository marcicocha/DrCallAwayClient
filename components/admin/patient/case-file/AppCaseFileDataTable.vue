<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :pagination="false"
      :row-key="(record) => record.caseId"
    >
      <template slot="status" slot-scope="text, record">
        <div
          :class="{
            blue: record.status === 'Active',
            green: record.status === 'Completed',
            red: record.status === 'Pending',
          }"
        >
          {{ record.status }}
        </div>
      </template>
      <template slot="operation" slot-scope="text, record">
        <div style="text-align: right">
          <a-button-group class="link-group">
            <a-button
              v-if="status !== 'Pending'"
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
export default {
  name: 'AppCaseFileDataTable',
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
          title: 'Case ID',
          dataIndex: 'caseId',
          scopedSlots: { customRender: 'caseId' },
        },
        {
          title: 'Consultant Name',
          dataIndex: 'consultantName',
          scopedSlots: { customRender: 'consultantName' },
        },
        {
          title: 'Complaint',
          dataIndex: 'complaint',
          scopedSlots: { customRender: 'complaint' },
        },
        {
          title: 'Date Added',
          dataIndex: 'dateAdded',
          scopedSlots: { customRender: 'dateAdded' },
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
  },
  methods: {
    viewCaseFile(record) {
      this.$emit('showCaseFile', record)
    },
  },
}
</script>
