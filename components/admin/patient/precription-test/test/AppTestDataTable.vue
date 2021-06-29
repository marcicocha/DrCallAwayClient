<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="allTests"
      :pagination="false"
      :custom-row="customRow"
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
    </a-table>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'AppTestDataTable',
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
          title: 'Test ID',
          dataIndex: 'testId',
          scopedSlots: { customRender: 'testId' },
        },
        {
          title: 'Case Associated',
          dataIndex: 'caseAssociated',
          scopedSlots: { customRender: 'caseAssociated:' },
        },
        {
          title: 'Prescribed By',
          dataIndex: 'prescribedBy',
          scopedSlots: { customRender: 'prescribedBy' },
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
      allTests: (state) => state.testsModule.tests,
    }),
  },
  async mounted() {
    try {
      const obj = {
        ...this.filterObj,
        status: this.status,
      }
      await this.getAllTests(obj)
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
            this.$emit('showTestModal', record)
          },
        },
      }
    },
    ...mapActions({
      getAllTests: 'testsModule/GET_TESTS',
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
