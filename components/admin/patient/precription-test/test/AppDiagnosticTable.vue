<template>
  <div>
    <div class="colored-table">
      <a-table
        :columns="columns"
        :data-source="dataSource"
        :pagination="false"
        :row-key="(record) => record.id"
      >
        <template slot="sn" slot-scope="text, record, index">
          {{ index + 1 }}
        </template>
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
              `${selectedDiagnosticObj.registered_name} (${selectedDiagnosticObj.address})`
            }}
          </h6>
          <a-divider />
          <AppSelectedDiagnostic :test-list="testList" />
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
  props: {
    testList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectedDiagnosticModalIsVisible: false,
      selectedDiagnosticObj: {},
      confirmLoading: false,
      dataSource: [],
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
          dataIndex: 'registered_name',
          scopedSlots: { customRender: 'registered_name' },
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
          width: '15%',
        },
      ]
      return columns
    },
  },
  mounted() {
    this.fetchDiagnosticListHandler()
  },
  methods: {
    selectHandler(record) {
      this.selectedDiagnosticObj = record
      this.selectedDiagnosticModalIsVisible = true
    },
    closeModal() {
      this.selectedDiagnosticModalIsVisible = false
    },
    async fetchDiagnosticListHandler() {
      try {
        const user = JSON.parse(localStorage.getItem('user'))
        const config = {
          headers: { Authorization: `Bearer ${user.token.token}` },
        }
        const { data } = await this.$axios.$get('/tests/patient/list', config)
        this.dataSource = data
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
