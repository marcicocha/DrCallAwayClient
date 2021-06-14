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
        :visible="selectedPharmacyModalIsVisible"
        width="600px"
        :confirm-loading="confirmLoading"
        :footer="null"
        :destroy-on-close="true"
        :mask-style="{ background: 'rgba(61, 12, 60, 0.9)' }"
        centered
        @cancel="closeModal"
      >
        <div>
          <h6 class="t-c">Selected Pharmacy: {{ selectedPharmacyObj.name }}</h6>
          <a-divider />
          <AppSelectedPharmacy />
        </div>
      </a-modal>
    </div>
  </div>
</template>
<script>
import AppButton from '@/components/AppButton'
import AppSelectedPharmacy from '@/components/admin/patient/precription-test/prescription/AppSelectedPharmacy'
export default {
  name: 'AppPharmacyTable',
  components: {
    AppButton,
    AppSelectedPharmacy,
  },
  data() {
    return {
      selectedPharmacyModalIsVisible: false,
      selectedPharmacyObj: {},
      confirmLoading: false,
      dataSource: [
        {
          id: 1,
          name: 'Medplus Pharmacy',
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
          title: 'NAME OF PHARMACY',
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
      this.selectedPharmacyObj = record
      this.selectedPharmacyModalIsVisible = true
    },
    closeModal() {
      this.selectedPharmacyModalIsVisible = false
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
