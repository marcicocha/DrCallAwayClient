<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="allAppointments"
      :pagination="pagination"
      :row-key="(record) => record.appointmentId"
      :custom-row="customRow"
    >
      <template slot="status" slot-scope="text, record">
        <div
          :class="{
            blue: record.status === 'ACTIVE',
            green: record.status === 'CCOMPLETED',
            red: record.status === 'PENDING',
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
  name: 'AppAppointmentDataTable',
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
          title: 'Appointment ID',
          dataIndex: 'appointmentId',
          scopedSlots: { customRender: 'appointmentId' },
        },
        {
          title: 'Consultant Name',
          dataIndex: 'consultantName',
          scopedSlots: { customRender: 'consultantName' },
        },
        {
          title: 'Description',
          dataIndex: 'description',
          scopedSlots: { customRender: 'description' },
        },
        {
          title: 'Date of Visit',
          dataIndex: 'dateOfVisit',
          scopedSlots: { customRender: 'dateOfVisit' },
        },
        {
          title: 'Time of Visit',
          dataIndex: 'timeOfVisit',
          scopedSlots: { customRender: 'timeOfVisit' },
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
      allAppointments: (state) => state.appointmentModule.appointments,
    }),
  },
  async mounted() {
    try {
      const obj = {
        ...this.filterObj,
        status: this.status,
      }
      await this.getAllAppointment(obj)
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
            this.$emit('showAppointmentModal', record)
          },
        },
      }
    },
    ...mapActions({
      getAllAppointment: 'appointmentModule/GET_APPOINTMENT',
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
