<template>
  <div>
    <a-form>
      <ValidationObserver ref="observer" tag="div">
        <AppSelect
          v-model="opticalObj.specialistId"
          label="List of Optician"
          placeholder="Select a Optician"
          name="optical clinic"
          rules="required"
          required
          url="specialists/SPELTY021"
          :call-back-func="
            (resp) => ({
              text: resp.user.first_name + ' - ' + resp.user.last_name,
              value: resp.id,
              address: resp.user.address,
            })
          "
          @selectedObject="selectedObjectHandler"
        />
        <AppSelect
          v-model="opticalObj.opticalService"
          label="Optical Service"
          placeholder="Select a Optical Service"
          name="optical service"
          rules="required"
          required
          url="get_service_and_price_list?type=opticalServices"
          :call-back-func="
            (resp) => ({
              text: resp.name,
              value: resp.name,
              amount: resp.amount,
            })
          "
          @selectedObject="selectedOpticalServiceHandler"
        />
        <AppInput
          v-model="opticalObj.address"
          label="Clinic Address"
          name="clinic address"
          disabled
        />
        <AppInput
          v-model="opticalObj.paymentCharge"
          label="Payment Charge"
          name="Payment charge"
          disabled
        />
        <AppDatePicker
          v-model="opticalObj.date"
          label="Select Start Date"
          name="select start date"
          rules="required"
          required
          :disabled-date="disabledDate"
        />
        <AppTimePicker
          v-model="opticalObj.time"
          label="Select Start Time"
          name="select start time"
          rules="required"
          required
        />
        <AppTextArea
          v-model="opticalObj.additional_info"
          label="Briefly tell Nutritionist what you are consulting for"
        />
      </ValidationObserver>
      <br />
      <div class="t-c">
        <AppButton
          type="primary"
          :block="false"
          :loading="isLoading"
          class="admin-button"
          @click="submitHandler"
          >SUBMIT</AppButton
        >
      </div>
    </a-form>
    <a-modal
      :visible="modalIsVisible"
      width="600px"
      :confirm-loading="confirmLoading"
      :footer="null"
      :destroy-on-close="true"
      :mask-style="{ background: 'rgba(61, 12, 60, 0.9)' }"
      centered
      @cancel="closeModal"
    >
      <div>
        <div>
          <h6 class="t-c">
            {{ `Selected Optician: ${optician}` }}
          </h6>
          <a-divider />
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
            </a-table>
          </div>
          <br />
          <div>
            <a-row type="flex" :gutter="24">
              <a-col :span="12">
                <AppButton
                  type="default"
                  :loading="isLoading"
                  class="admin-button"
                  @click="closeModal"
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
      </div>
    </a-modal>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { ValidationObserver } from 'vee-validate'
import moment from 'moment'
import AppInput from '@/components/AppInput'
import AppSelect from '@/components/AppSelect'
import AppTextArea from '@/components/AppTextArea'
import AppPayment from '@/components/AppPayment.vue'
import AppDatePicker from '@/components/AppDatePicker'
import AppTimePicker from '@/components/AppTimePicker'
export default {
  name: 'AppOpticalForm',
  components: {
    ValidationObserver,
    AppInput,
    AppTextArea,
    AppSelect,
    AppPayment,
    AppTimePicker,
    AppDatePicker,
  },
  data() {
    return {
      opticalObj: {},
      isLoading: false,
      modalIsVisible: false,
      confirmLoading: false,
      dataSource: [],
      user: {},
      optician: '',
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
          title: 'NAME OF SERVICE',
          dataIndex: 'service',
        },
        {
          title: 'PRICE',
          dataIndex: 'amount',
        },
      ]
      return columns
    },
  },
  methods: {
    closeModal() {
      this.modalIsVisible = false
    },
    selectedObjectHandler(rcd) {
      this.optician = rcd.text
      this.opticalObj.address = rcd.address
    },
    selectedOpticalServiceHandler(rcd) {
      this.opticalObj.paymentCharge = rcd.amount
      this.dataSource = [
        {
          service: rcd.text,
          amount: rcd.amount,
        },
      ]
      const userObject = JSON.parse(localStorage.getItem('user'))
      this.user = {
        email: userObject.email,
        firstName: userObject.first_name,
        lastName: userObject.last_name,
        amount: rcd.amount,
      }
    },
    disabledDate(current) {
      // Can not select days before today and today
      return current && current < moment().startOf('day')
    },
    async callback(res) {
      if (res.message === 'Approved') {
        this.$notification.success({
          message: res.message,
          description: 'Payment successful',
          duration: 4000,
        })
        try {
          const obj = {
            ...this.opticalObj,
            specialtyId: 35,
            date: moment(this.opticalObj.date).format('YYYY-MM-DD'),
          }
          const message = await this.submitAppointmentHandler(obj)
          this.$notification.success({
            message: 'Success',
            description: message,
            duration: 4000,
          })
          this.$router.replace('/admin/patient/appointment')
          requestAnimationFrame(() => {
            this.$refs.observer.reset()
            this.isLoading = false
            this.modalIsVisible = false
            this.opticalObj = {}
            this.$emit('formSubmissionCompleted')
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
      }
    },
    async submitHandler() {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      // this.isLoading = true
      this.modalIsVisible = true
    },
    ...mapActions({
      submitAppointmentHandler: 'appointmentModule/BOOK_APPOINTMENT',
    }),
  },
}
</script>
<style lang="scss" scoped>
.payButton {
  width: 100%;
}
</style>
