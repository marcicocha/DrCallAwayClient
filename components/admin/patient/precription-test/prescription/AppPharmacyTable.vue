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
      <br />
      <p class="red">
        ***Please call to confirm the availability of Drugs before selecting a
        Pharmacy***
      </p>
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
          <h6 class="t-c">
            Selected Pharmacy: {{ selectedPharmacyObj.registered_name }}
          </h6>
          <a-divider />
          <AppSelectedPharmacy :drugList="drugList" />
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
  props: {
    drugList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectedPharmacyModalIsVisible: false,
      selectedPharmacyObj: {},
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
          title: 'NAME OF PHARMACY',
          dataIndex: 'registered_name',
          scopedSlots: { customRender: 'registered_name' },
        },
        {
          title: 'ADDRESS',
          dataIndex: 'address',
        },
        {
          title: 'PHONE NUMBER',
          dataIndex: 'mobile_phone_number',
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
    this.fetchPharmacyListHandler()
  },
  methods: {
    selectHandler(record) {
      this.selectedPharmacyObj = record
      this.selectedPharmacyModalIsVisible = true
    },
    closeModal() {
      this.selectedPharmacyModalIsVisible = false
    },
    async fetchPharmacyListHandler() {
      try {
        const user = JSON.parse(localStorage.getItem('user'))
        const config = {
          headers: { Authorization: `Bearer ${user.token.token}` },
        }
        const { data } = await this.$axios.$get('pharmacies', config)
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
