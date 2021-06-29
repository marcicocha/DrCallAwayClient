<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="allPrescription"
      :pagination="pagination"
      :custom-row="customRow"
    >
      <template slot="status" slot-scope="text, record">
        <div
          :class="{
            blue: record.status === 'ACTIVE',
            green: record.status === 'COMPLETED',
            red: record.status === 'BOOKED',
          }"
        >
          {{ record.status }}
        </div>
      </template>
    </a-table>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'AppPrescriptionDataTable',
  props: {
    status: {
      type: String,
      default: '',
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
          title: 'Prescription ID',
          dataIndex: 'prescriptionId',
          scopedSlots: { customRender: 'prescriptionId' },
        },
        {
          title: 'Prescription Title',
          dataIndex: 'prescriptionTitle',
          scopedSlots: { customRender: 'prescriptionTitle' },
        },
        {
          title: 'Presecription By',
          dataIndex: 'prescriptionBy',
          scopedSlots: { customRender: 'prescriptionBy' },
        },
        {
          title: 'Prescription Date',
          dataIndex: 'prescriptionDate',
          scopedSlots: { customRender: 'prescriptionDate' },
        },
        {
          title: 'Status',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' },
        },
        // {
        //  title: '',
        //  dataIndex: 'operation1',
        //  scopedSlots: { customRender: 'operation' },
        // },
      ]
      return columns
    },
    ...mapState({
      allPrescription: (state) => state.prescriptionModule.prescriptions,
    }),
  },
  async mounted() {
    try {
      const obj = {
        ...this.filterObj,
        status: this.status,
      }
      await this.getAllPrescription(obj)
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
    customRow(record) {
      return {
        on: {
          click: (event) => {
            this.$emit('showPrescriptionModal', record)
          },
        },
      }
    },
    ...mapActions({
      getAllPrescription: 'prescriptionModule/GET_PRESCRIPTION',
    }),
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
