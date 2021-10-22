<template>
  <div class="colored-table">
    <a-table :columns="columns" :data-source="testList" :pagination="false">
      <template slot="sn" slot-scope="text, record, index">
        {{ index + 1 }}
      </template>
    </a-table>
    <p class="price-total">
      <span>TOTAL</span> <span>{{ `N${totalPrice}` }}</span>
    </p>
    <br />
    <div class="t-c">
      <AppPayment :user-obj="finalUserObj" @callback="callback">
        MAKE PAYMENT
      </AppPayment>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AppSelectedDiagnostic',
  components: {},
  props: {
    testList: {
      type: Array,
      default: () => [],
    },
    currentTestObj: {
      type: Object,
      default: () => {},
    },
    selectedDiagnosticObj: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    const user = JSON.parse(localStorage.getItem('user'))
    const config = {
      headers: { Authorization: `Bearer ${user.token.token}` },
    }
    return {
      isLoading: false,
      user,
      config,
    }
  },
  computed: {
    totalPrice() {
      let total = 0
      this.testList.forEach((record) => (total += record.price_in_minor_unit))
      return total
    },
    finalUserObj() {
      const obj = {
        ...this.user,
        amount: this.totalPrice,
      }
      return obj
    },
    columns() {
      const columns = [
        {
          title: 'S/N',
          dataIndex: 'sn',
          scopedSlots: { customRender: 'sn' },
        },
        {
          title: 'NAME OF TEST',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' },
        },
        {
          title: 'PRICE',
          dataIndex: 'price_in_minor_unit',
          scopedSlots: { customRender: 'price_in_minor_unit' },
        },
      ]
      return columns
    },
  },
  methods: {
    async callback(res, record) {
      if (res.message === 'Approved') {
        this.$notification.success({
          message: res.message,
          description: 'Payment successful',
          duration: 4000,
        })
        this.isLoading = true
        try {
          const { message } = this.$axios.$patch(
            `/tests/assignTestToDiagnosticCenter/${this.currentTestObj.id}?partners_id=${this.selectedDiagnosticObj.id}`,
            this.selectedDiagnosticObj.id,
            this.config
          )
          this.$notification.success({
            message: 'Success',
            description: message,
            duration: 4000,
          })
          this.$emit('closeModal')
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
      }
    },
  },
}
</script>
