<template>
  <div>
    <a-form>
      <ValidationObserver ref="observer" tag="div">
        <AppSelect
          v-model="nutritionistObj.specialistId"
          label="List of Nutritionist"
          placeholder="Select a Nutritionist"
          name="nurse"
          rules="required"
          required
          :url="`specialists/`"
          :call-back-func="
            (resp) => ({
              text: resp.user.first_name + ' - ' + resp.user.last_name,
              value: resp.id,
            })
          "
          @change="changeNutritionistHandler"
        />
        <AppInput
          v-model="nutritionistObj.address"
          label="Address"
          name="address"
        />
        <AppInput
          v-model="nutritionistObj.paymentCharge"
          label="Payment Charge"
          name="Payment charge"
        />
        <AppDatePicker
          v-model="nutritionistObj.date"
          label="Select Start Date"
          name="select start date"
        />
        <AppTimePicker
          v-model="nutritionistObj.time"
          label="Select Start Time"
          name="select start time"
        />
        <AppTextArea
          v-model="nutritionistObj.additional_info"
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
            {{
              `Selected Nutritionist: ${nutritionistObj.specialist} (${nutritionistObj.specialistAddress})`
            }}
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
import AppInput from '@/components/AppInput'
import AppSelect from '@/components/AppSelect'
import AppTextArea from '@/components/AppTextArea'
import AppPayment from '@/components/AppPayment.vue'
import AppDatePicker from '@/components/AppDatePicker'
import AppTimePicker from '@/components/AppTimePicker'
export default {
  name: 'AppNutritionForm',
  components: {
    ValidationObserver,
    AppInput,
    AppSelect,
    AppTextArea,
    AppPayment,
    AppDatePicker,
    AppTimePicker,
  },
  data() {
    return {
      nutritionistObj: {},
      isLoading: false,
      modalIsVisible: false,
      confirmLoading: false,
      dataSource: [],
      user: {},
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
    changeNutritionistHandler() {
      console.log('CHANGED')
    },
    async callback(res) {
      if (res.message === 'Approved') {
        this.$notification.success({
          message: res.message,
          description: 'Payment successful',
          duration: 4000,
        })
        try {
          const message = await this.submitAppointmentHandler(
            this.nutritionistObj
          )
          this.$notification.success({
            message: 'Success',
            description: message,
            duration: 4000,
          })
          requestAnimationFrame(() => {
            this.$refs.observer.reset()
            this.isLoading = false
            this.modalIsVisible = false
            this.nutritionistObj = {}
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
