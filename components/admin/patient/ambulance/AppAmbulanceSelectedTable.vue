<template>
  <div class="colored-table">
    <a-table :columns="columns" :data-source="dataSource" :pagination="false" />
    <p class="t-r"><span>TOTAL</span> <span>N</span></p>
    <br />
    <div>
      <a-row type="flex" :gutter="24">
        <a-col :span="12">
          <AppButton
            type="default"
            class="admin-button"
            @click="$emit('closeModal')"
            >GO BACK</AppButton
          >
        </a-col>
        <a-col :span="12">
          <AppPayment :user-obj="user" @callback="callback">
            MAKE PAYMENT
          </AppPayment>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import AppPayment from '@/components/AppPayment.vue'

export default {
  name: 'AppAmbulanceSelectedTable',
  components: {
    AppPayment,
  },
  props: {
    dataSource: {
      type: Array,
      default: () => [],
    },
    user: {
      type: Object,
      default: () => ({}),
    },
    requestObj: {
      type: Object,
      default: () => ({}),
    },
    selectedAmbulanceObj: {
      type: Object,
      default: () => ({}),
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
          title: 'AMBULANCE NAME',
          dataIndex: 'registered_name',
          scopedSlots: { customRender: 'registered_name' },
        },
        {
          title: 'NAME OF SERVICE',
          dataIndex: 'nameOfService',
          scopedSlots: { customRender: 'nameOfService' },
        },
        {
          title: 'PRICE',
          dataIndex: 'price',
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
          const request = {
            ...this.requestObj,
            ambulance_id: this.selectedAmbulanceObj.id,
          }
          const message = await this.submitAmbulanceHandler(request)
          this.$notification.success({
            message: 'Success',
            description: message,
            duration: 4000,
          })
          this.$emit('onClose')
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
      }
    },
    ...mapActions({
      submitAmbulanceHandler: 'ambulanceModule/ADD_AMBULANCE',
    }),
  },
}
</script>
<style lang="scss">
.payButton {
  width: 100% !important;
}
</style>
