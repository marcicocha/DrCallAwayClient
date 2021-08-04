<template>
  <div>
    <h6>Book an Appointment</h6>
    <div class="admin-wrapper">
      <a-form>
        <ValidationObserver ref="observer" tag="div">
          <a-row type="flex" :gutter="16">
            <a-col :span="12">
              <AppSelect
                v-model="bookAppointmentObj.specialtyId"
                label="List of Medical Specialties"
                placeholder="Select a Medical Specialty"
                name="medical specialties"
                url="/specialties"
                :call-back-func="
                  (resp) => ({
                    text: resp.name,
                    value: resp.id,
                  })
                "
                rules="required"
                required
                @select="selectSpecialityHandler"
              />
            </a-col>
            <a-col :span="12">
              <AppSelect
                :key="bookAppointmentObj.specialtyId"
                v-model="bookAppointmentObj.specialistId"
                label="List of Specialists"
                placeholder="Select a Specialist"
                name="specialists"
                rules="required"
                required
                :url="`specialists/${bookAppointmentObj.specialtyId}`"
                :call-back-func="
                  (resp) => ({
                    text: resp.user.first_name + ' - ' + resp.user.last_name,
                    value: resp.id,
                  })
                "
                @select="selectSpecialistHandler"
              />
              <small style="color: #3d0c3c"
                >One will be automatically selected for you if you don't know
                whom to select</small
              >
            </a-col>
            <a-col :span="12">
              <AppInput
                v-model="bookAppointmentObj.address"
                label="Address"
                name="Address"
              />
            </a-col>
            <a-col :span="12">
              <AppInput
                v-model="bookAppointmentObj.paymentCharge"
                label="Payment Charge"
                name="payment charge"
                disabled
              />
            </a-col>
            <a-col :span="12">
              <AppDatePicker
                v-model="bookAppointmentObj.date"
                label="Select Proposed Date"
                name="select proposed date"
                :disabled-date="disabledDate"
              />
            </a-col>
            <a-col :span="12">
              <AppTimePicker
                v-model="bookAppointmentObj.time"
                label="Select Proposed Time"
                name="select proposed time"
              />
            </a-col>
            <a-col :span="24">
              <AppTextArea
                v-model="bookAppointmentObj.additional_info"
                label="Additional Comment"
                placeholder="Briefly tell Specialist how you are feeling"
              />
            </a-col>
          </a-row>
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
              {{ `Selected Specialist: ${specialist} (${speciality})` }}
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
  </div>
</template>
<script>
import { ValidationObserver } from 'vee-validate'
import { mapActions } from 'vuex'
import moment from 'moment'
import AppInput from '@/components/AppInput'
import AppSelect from '@/components/AppSelect'
import AppTextArea from '@/components/AppTextArea'
import AppButton from '@/components/AppButton'
import AppDatePicker from '@/components/AppDatePicker'
import AppTimePicker from '@/components/AppTimePicker'
import AppPayment from '@/components/AppPayment.vue'

export default {
  components: {
    AppInput,
    AppSelect,
    AppTextArea,
    AppButton,
    ValidationObserver,
    AppDatePicker,
    AppTimePicker,
    AppPayment,
  },
  layout: 'dashboard',
  data() {
    return {
      bookAppointmentObj: {},
      isLoading: false,
      modalIsVisible: false,
      confirmLoading: false,
      dataSource: [],
      user: {},
      specialist: '',
      speciality: '',
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
    closeModal() {
      this.modalIsVisible = false
    },
    selectSpecialistHandler(value, options) {
      const description = options.componentOptions.propsData.title
      this.specialist = description
    },
    selectSpecialityHandler(value, options) {
      const description = options.componentOptions.propsData.title
      this.speciality = description
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
            ...this.bookAppointmentObj,
            date: moment(this.bookAppointmentObj.date).format('YYYY-MM-DD'),
          }
          const message = await this.submitAppointmentHandler(obj)
          this.$notification.success({
            message: 'Success',
            description: message,
            duration: 4000,
          })

          requestAnimationFrame(() => {
            this.$refs.observer.reset()
            this.isLoading = false
            this.modalIsVisible = false
            this.bookAppointmentObj = {}
            this.$emit('formSubmissionCompleted')
          })
          this.$router.replace('/admin/patient/appointment')
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
h6 {
  color: $dark-purple;
}
.payButton {
  width: 100%;
}
</style>
