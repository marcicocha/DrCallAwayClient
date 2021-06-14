<template>
  <div>
    <div class="colored-table">
      <a-table
        :columns="columns"
        :data-source="dataSource"
        :pagination="false"
        :row-key="(record) => record.id"
      >
        <template slot="select" slot-scope="text, record">
          <AppButton
            type="primary"
            :block="false"
            class="admin-button dark-button"
            @click="selectHandler(record)"
            >SELECT</AppButton
          >
        </template>
      </a-table>
      <a-modal
        :visible="selectedDiagnosticModalIsVisible"
        width="600px"
        :confirm-loading="confirmLoading"
        :footer="null"
        :destroy-on-close="true"
        :mask-style="{ background: 'rgba(61, 12, 60, 0.9)' }"
        centered
        @cancel="closeModal"
      >
        <div>
          <h6 class="t-c">
            Selected Diagnostic Center:
            {{
              `${selectedDiagnosticObj.name} (${selectedDiagnosticObj.address})`
            }}
          </h6>
          <a-divider />
          <AppSelectedDiagnostic />
        </div>
      </a-modal>
    </div>
  </div>
</template>
<script>
import AppButton from '@/components/AppButton'
import AppSelectedDiagnostic from '@/components/admin/patient/precription-test/test/AppSelectedDiagnostic'
export default {
  name: 'AppDiagnosticTable',
  components: {
    AppButton,
    AppSelectedDiagnostic,
  },
  data() {
    return {
      selectedDiagnosticModalIsVisible: false,
      selectedDiagnosticObj: {},
      confirmLoading: false,
      dataSource: [
        {
          id: 1,
          name: 'Smith Diagnostic Center',
          address: 'ijapo estate, Akure',
        },
      ],
    }
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
          title: 'NAME OF DIAGNOSTIC',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' },
        },
        {
          title: 'ADDRESS',
          dataIndex: 'address',
          scopedSlots: { customRender: 'address' },
        },
        {
          title: 'SELECT',
          dataIndex: 'select',
          scopedSlots: { customRender: 'select' },
        },
      ]
      return columns
    },
  },
  methods: {
    selectHandler(record) {
      this.selectedDiagnosticObj = record
      this.selectedDiagnosticModalIsVisible = true
    },
    closeModal() {
      this.selectedDiagnosticModalIsVisible = false
    },
  },
}
</script>
<style lang="scss" scoped>
.dark-button {
  background: $medium-purple !important;
  font-size: 14px;
  padding: 0 2rem;
}
h6 {
  color: $dark-purple;
}
</style>
