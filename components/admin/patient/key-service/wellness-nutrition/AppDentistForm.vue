<template>
  <div>
    <a-form>
      <ValidationObserver ref="observer" tag="div">
        <AppSelect
          v-model="dentistObj.specialistId"
          label="List of Dental Clinic"
          placeholder="Select a Dental Clinic"
          name="dental clinic"
          rules="required"
          required
          url="specialists/145"
          :call-back-func="
            (resp) => ({
              text: resp.user.first_name + ' - ' + resp.user.last_name,
              value: resp.id,
            })
          "
          @select="selectDentistHandler"
        />
        <AppSelect
          v-model="dentistObj.dentalService"
          label="Dental Service"
          placeholder="Select a Dental Service"
          name="dental service"
          :data="['YES']"
          :remote="true"
        />
        <AppInput v-model="dentistObj.address" label="Address" name="address" />
        <AppInput
          v-model="dentistObj.paymentCharge"
          label="Payment Charge"
          name="Payment charge"
          disabled
        />
        <AppDatePicker
          v-model="dentistObj.date"
          label="Select Start Date"
          name="select start date"
          :disabled-date="disabledDate"
        />
        <AppTimePicker
          v-model="dentistObj.time"
          label="Select Start Time"
          name="select start time"
        />
        <AppTextArea
          v-model="dentistObj.additional_info"
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
            {{ `Selected Dentist: ${dentist}` }}
          </h6>
          <a-divider />
          <div class="colored-table">
            <a-table
              :columns="columns"
              :data-source="dataSource"
              :pagination="false"
              :row-key="(record) => record.id"
            ></a-table>
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
  name: 'AppDentistForm',
  components: {
    ValidationObserver,
    AppInput,
    AppTextArea,
    AppSelect,
    AppPayment,
    AppDatePicker,
    AppTimePicker,
  },
  data() {
    return {
      dentistObj: {},
      isLoading: false,
      modalIsVisible: false,
      confirmLoading: false,
      dataSource: [],
      user: {},
      dentist: '',
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
          dataIndex: 'nameOfService',
          scopedSlots: { customRender: 'nameOfService' },
        },
        {
          title: 'PRICE',
          dataIndex: 'price',
          scopedSlots: { customRender: 'price' },
        },
      ]
      return columns
    },
  },
  mounted() {
    const userObject = JSON.parse(localStorage.getItem('user'))
    this.user = {
      email: userObject.email,
      firstName: userObject.first_name,
      lastName: userObject.last_name,
      amount: 100,
    }
  },
  methods: {
    selectDentistHandler(value, options) {
      const description = options.componentOptions.propsData.title
      this.dentist = description
    },
    disabledDate(current) {
      // Can not select days before today and today
      return current && current < moment().startOf('day')
    },
    closeModal() {
      this.modalIsVisible = false
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
            ...this.dentistObj,
            specialtyId: 145,
            date: moment(this.dentistObj.date).format('YYYY-MM-DD'),
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
            this.dentistObj = {}
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
