<template>
  <div class="colored-table">
    <a-table :columns="columns" :data-source="drugList" :pagination="false">
      <template slot="sn" slot-scope="text, record, index">
        {{ index + 1 }}
      </template>
    </a-table>
    <!-- <p class="t-r"><span>TOTAL</span> <span>N2,300</span></p> -->
    <br />
    <div v-if="drugList.length !== 0" class="t-c">
      <AppButton
        type="primary"
        :block="false"
        :loading="isLoading"
        class="admin-button"
        @click="submitHandler"
        >SUBMIT</AppButton
      >
    </div>
  </div>
</template>
<script>
import AppButton from '@/components/AppButton'

export default {
  name: 'AppSelectedPharmacy',
  components: {
    AppButton,
  },
  props: {
    drugList: {
      type: Array,
      default: () => [],
    },
    selectedPharmacyObj: {
      type: Object,
      default: () => ({}),
    },
    prescriptionObj: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isLoading: false,
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
          title: 'Name',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' },
        },
        {
          title: 'Dosage',
          dataIndex: 'dosage',
          scopedSlots: { customRender: 'dosage' },
        },
        {
          title: 'Duration (Days)',
          dataIndex: 'duration',
          scopedSlots: { customRender: 'duration' },
        },
      ]
      return columns
    },
  },
  methods: {
    async submitHandler() {
      const user = JSON.parse(localStorage.getItem('user'))
      const config = {
        headers: { Authorization: `Bearer ${user.token.token}` },
      }
      try {
        const obj = {
          partners_id: this.selectedPharmacyObj.id,
          status: 'PENDING',
        }
        const { message } = await this.$axios.patch(
          `prescriptions/${this.prescriptionObj.id}/pharmacies`,
          obj,
          config
        )
        this.$emit('closeModal')
        this.$notification.success({
          message: 'Success',
          description: message,
          duration: 4000,
        })
      } catch (err) {
        this.isLoading = false
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
