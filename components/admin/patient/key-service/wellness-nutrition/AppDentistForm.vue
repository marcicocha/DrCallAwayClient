<template>
  <div>
    <a-form>
      <ValidationObserver ref="observer" tag="div">
        <AppSelect
          v-model="dentistObj.specialistId"
          label="List of Dentist"
          placeholder="Select a Dentist"
          name="dental clinic"
          rules="required"
          required
          url="specialists/SPELTY020"
          :call-back-func="
            (resp) => ({
              text: resp.user.first_name + ' - ' + resp.user.last_name,
              value: resp.user_id,
              address: resp.user.address,
            })
          "
          @selectedObject="selectedObjectHandler"
        />
        <AppSelect
          v-model="dentistObj.dentalService"
          label="Dental Service"
          placeholder="Select a Dental Service"
          name="dental service"
          url="get_dentist_or_optician_list?type=dentist"
          :call-back-func="
            (resp) => ({
              text: resp.name,
              value: resp.name,
            })
          "
        />
        <AppInput
          v-model="dentistObj.address"
          label="Address"
          name="address"
          disabled
        />
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
          label="Briefly tell Dentist what you are consulting for"
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
import AppButton from '@/components/AppButton'
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
    AppButton,
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
    selectedObjectHandler(rcd) {
      this.dentist = rcd.text
      this.dentistObj.address = rcd.address
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
