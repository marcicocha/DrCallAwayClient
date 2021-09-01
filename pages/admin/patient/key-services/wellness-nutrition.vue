<template>
  <div>
    <a-row v-if="!screenIsVisible" type="flex" :gutter="24">
      <a-col v-for="(card, j) in wellnessList" :key="j" :span="12">
        <AppDashboardCard
          :card-obj="card"
          :color="card.color"
          style="margin-bottom: 2rem"
          @click="showModalhandler(card.key)"
        />
      </a-col>
    </a-row>
    <div v-else>
      <div>
        <a @click="closeViewHandler"
          ><img src="@/assets/images/long-arrow-left.svg"
        /></a>
      </div>
      <br />
      <div>
        <AppScreeningTab @currentKeyHandler="currentKeyHandler" />

        <br />
        <div>
          <h6>Locate Nearest Center</h6>
          <a-form>
            <a-row type="flex" align="middle" :gutter="16">
              <a-col :span="16">
                <div class="admin-wrapper">
                  <ValidationObserver ref="observer" tag="div">
                    <a-row type="flex" align="bottom" :gutter="16">
                      <a-col :span="12">
                        <AppSelect
                          v-model="nearestDiagnosticObj.state"
                          label="State"
                          placeholder="State"
                          name="state"
                          url="/states"
                          :call-back-func="
                            (resp) => ({
                              text: resp,
                              value: resp,
                            })
                          "
                          rules="required"
                          required
                          @change="selectStateHandler"
                        />
                      </a-col>
                      <a-col :span="12">
                        <AppSelect
                          :key="counter"
                          v-model="nearestDiagnosticObj.lga"
                          label="LGA"
                          placeholder="Select LGA"
                          name="LGA"
                          rules="required"
                          required
                          :url="`/lgas/${nearestDiagnosticObj.state}`"
                          :call-back-func="
                            (resp) => ({
                              text: resp,
                              value: resp,
                            })
                          "
                          @change="selectLgaHandler"
                        />
                      </a-col>
                      <a-col :span="24">
                        <AppSelect
                          :key="lgaCounter"
                          v-model="nearestDiagnosticObj.diagnosticCenter"
                          label="Select a Diagnostic Center"
                          placeholder="Select Diagnostic Center"
                          name="Diagnostic Center"
                          rules="required"
                          required
                          :url="`/list/diagnostic?state=${nearestDiagnosticObj.state}&city=${nearestDiagnosticObj.lga}`"
                          :call-back-func="
                            (resp) => ({
                              text: resp.registered_name,
                              value: resp.registered_name,
                              id: resp.id,
                              address: resp.address,
                            })
                          "
                          :disabled="
                            !nearestDiagnosticObj.state &&
                            !nearestDiagnosticObj.lga
                          "
                          @selectedObject="selectedObjectHandler"
                        />
                      </a-col>
                    </a-row>
                  </ValidationObserver>
                </div>
              </a-col>
              <a-col :span="8" class="t-c">
                <p>Selected Diagnostic Center</p>
                <p style="text-transform: uppercase">
                  {{
                    nearestDiagnosticObj.diagnosticCenter
                      ? `${nearestDiagnosticObj.diagnosticCenter} (${nearestDiagnosticObj.address}) `
                      : ''
                  }}
                </p>
                <AppButton
                  type="primary"
                  :block="false"
                  :loading="isLoading"
                  class="admin-button"
                  :disabled="!nearestDiagnosticObj.diagnosticCenter"
                  @click="submitHandler"
                  >PROCEED</AppButton
                >
                <p class="error">
                  By clicking “PROCEED” you are giving your consent.
                </p>
              </a-col>
            </a-row>
          </a-form>
        </div>
      </div>
    </div>
    <a-modal
      :visible="modalIsVisible"
      width="500px"
      :confirm-loading="confirmLoading"
      :footer="null"
      :destroy-on-close="true"
      :mask-style="{ background: 'rgba(61, 12, 60, 0.9)' }"
      centered
      @cancel="closeModal"
    >
      <div>
        <h6 class="t-c">{{ modalTitle }}</h6>
        <a-divider />
        <div>
          <AppScreeningForm
            v-if="wellnessKey === 'screening'"
            @showScreeningPage="showScreeningPage"
          />
          <AppNutritionForm v-if="wellnessKey === 'nutritionist'" />
          <AppDentistForm v-if="wellnessKey === 'dentist'" />
          <AppOpticalForm v-if="wellnessKey === 'optical'" />
        </div>
      </div>
    </a-modal>
    <a-modal
      :visible="modalTestIsVisible"
      width="700px"
      :confirm-loading="confirmLoading"
      :footer="null"
      :destroy-on-close="true"
      :mask-style="{ background: 'rgba(61, 12, 60, 0.9)' }"
      centered
      @cancel="closeTestModal"
    >
      <div class="colored-table">
        <h6 class="t-c">{{ modalTestTitle }}</h6>
        <a-table
          :columns="columns"
          :data-source="dataSource"
          :pagination="false"
        >
          <template slot="sn" slot-scope="text, record, index">
            {{ index + 1 }}
          </template>
        </a-table>
        <br />
        <div v-if="!showBookAppointment" class="t-c">
          <p style="font-size: 1.2rem; color: black">FEE: {{ price }}</p>
          <AppPayment :user-obj="user" @callback="callback">
            MAKE PAYMENT
          </AppPayment>
        </div>
        <div v-else>
          <h6>Book Appointment</h6>
          <ValidationObserver ref="observer2" tag="div">
            <a-row type="flex" :gutter="16">
              <a-col :span="12">
                <AppDatePicker
                  v-model="bookAppointmentObj.date"
                  label="Date Of Visit"
                  name="Date Of Visit"
                  :disabled-date="disabledDate"
                  rules="required"
                  required
                />
              </a-col>
              <a-col :span="12">
                <AppTimePicker
                  v-model="bookAppointmentObj.time"
                  label="Time Of Visit"
                  name="time of visit"
                  rules="required"
                  required
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
              @click="bookAppointmentHandler"
              >SUBMIT</AppButton
            >
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script>
import moment from 'moment'
import { ValidationObserver } from 'vee-validate'
import { mapActions } from 'vuex'
import AppDashboardCard from '@/components/AppDashboardCard'
import AppNutritionForm from '@/components/admin/patient/key-service/wellness-nutrition/AppNutritionForm'
import AppDentistForm from '@/components/admin/patient/key-service/wellness-nutrition/AppDentistForm'
import AppOpticalForm from '@/components/admin/patient/key-service/wellness-nutrition/AppOpticalForm'
import AppScreeningTab from '@/components/admin/patient/key-service/wellness-nutrition/AppScreeningTab'
import AppScreeningForm from '@/components/admin/patient/key-service/wellness-nutrition/AppScreeningForm'
import AppSelect from '@/components/AppSelect'
import AppDatePicker from '@/components/AppDatePicker'
import AppTimePicker from '@/components/AppTimePicker'
import AppButton from '@/components/AppButton'
import AppPayment from '@/components/AppPayment.vue'

export default {
  components: {
    AppDashboardCard,
    AppNutritionForm,
    AppDentistForm,
    AppOpticalForm,
    AppScreeningTab,
    AppSelect,
    AppButton,
    AppScreeningForm,
    AppDatePicker,
    AppTimePicker,
    AppPayment,
    ValidationObserver,
  },
  layout: 'dashboard',
  data() {
    return {
      modalIsVisible: false,
      screenIsVisible: false,
      confirmLoading: false,
      wellnessKey: false,
      isLoading: false,
      screeningFrequency: '',
      screeningPlan: 'BASIC',
      counter: 0,
      lgaCounter: 0,
      nearestDiagnosticObj: {},
      bookAppointmentObj: {},
      price: 40000,
      modalTestIsVisible: false,
      showBookAppointment: false,
      user: {},
      wellnessList: [
        {
          key: 'screening',
          firstText: 'Request Routine',
          secondText: 'MEDICAL SCREENING',
          imgSrc: 'admin/patient/2.png',
          color: '#641C62',
        },
        {
          key: 'nutritionist',
          firstText: 'Talk to a',
          secondText: 'NUTRITIONIST',
          imgSrc: 'admin/patient/2.png',
          color: '#BB58B6',
        },
        {
          key: 'dentist',
          firstText: 'Request a',
          secondText: 'DENTIST',
          imgSrc: 'admin/patient/2.png',
          color: '#BB58B6',
        },
        {
          key: 'optical',
          firstText: 'Request an',
          secondText: 'OPTICAL SERVICE',
          imgSrc: 'admin/patient/2.png',
          color: '#641C62',
        },
      ],
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
          title: 'SCREENING FREQUENCY',
          dataIndex: 'frequency',
        },
        {
          title: 'SCREENING PLAN',
          dataIndex: 'plan',
        },
      ]
      return columns
    },
    dataSource() {
      const array = [
        { frequency: this.screeningFrequency, plan: this.screeningPlan },
      ]
      return array
    },
    modalTestTitle() {
      if (this.showBookAppointment) {
        return `Selected Diagnostic Center: ${this.nearestDiagnosticObj.diagnosticCenter}`
      }
      return 'Recurring Medical Screening'
    },
    modalTitle() {
      if (this.wellnessKey === 'screening') {
        return 'Medical Screening'
      }
      if (this.wellnessKey === 'nutritionist') {
        return 'Talk to a Nutritionist'
      }
      if (this.wellnessKey === 'dentist') {
        return 'Request a Dentist'
      }
      return 'Request an Optical Service'
    },
  },
  methods: {
    selectedObjectHandler(rcd) {
      this.nearestDiagnosticObj.specialistId = rcd.id
      this.nearestDiagnosticObj.address = rcd.address
    },
    disabledDate(current) {
      // Can not select days before today and today
      return current && current < moment().startOf('day')
    },
    currentKeyHandler(key, price) {
      if (key === '1') {
        this.screeningPlan = 'BASIC'
      }
      if (key === '2') {
        this.screeningPlan = 'STANDARD'
      }
      if (key === '3') {
        this.screeningPlan = 'PREMIUM'
      }
      if (key === '4') {
        this.screeningPlan = 'EXECUTIVE'
      }
      this.price = price
    },
    showModalhandler(key) {
      this.modalIsVisible = true
      this.wellnessKey = key
    },
    selectStateHandler() {
      this.counter++
      this.nearestDiagnosticObj.lga = undefined
      this.nearestDiagnosticObj.diagnosticCenter = undefined
    },
    selectLgaHandler() {
      this.lgaCounter++
      this.nearestDiagnosticObj.diagnosticCenter = undefined
    },
    showScreeningPage(frequency) {
      this.modalIsVisible = false
      this.screenIsVisible = true
      this.screeningFrequency = frequency
    },
    closeModal() {
      this.modalIsVisible = false
    },
    closeTestModal() {
      this.modalTestIsVisible = false
    },
    closeViewHandler() {
      this.screenIsVisible = false
    },
    async bookAppointmentHandler() {
      const isValid = await this.$refs.observer2.validate()
      if (!isValid) {
        return
      }
      try {
        const obj = {
          ...this.bookAppointmentObj,
          date: moment(this.bookAppointmentObj.date).format('YYYY-MM-DD'),
          time: moment(this.bookAppointmentObj.time).format('HH:mm:ss'),
          screeningPlan: this.screeningPlan,
          frequency: this.screeningFrequency,
        }
        const message = await this.submitAppointmentHandler(obj)
        this.$notification.success({
          message: 'Success',
          description: message,
          duration: 4000,
        })
        this.$router.replace('/admin/patient/appointment')
        requestAnimationFrame(() => {
          this.$refs.observer2.reset()
          this.isLoading = false
          this.modalTestIsVisible = false
          this.showBookAppointment = false
          this.bookAppointmentObj = {}
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
    },
    callback(res) {
      if (res.message === 'Approved') {
        this.$notification.success({
          message: res.message,
          description: 'Payment successful',
          duration: 4000,
        })
        this.showBookAppointment = true
      }
    },
    async submitHandler() {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      const userObject = JSON.parse(localStorage.getItem('user'))
      this.user = {
        email: userObject.email,
        firstName: userObject.first_name,
        lastName: userObject.last_name,
        amount: this.price,
      }
      this.modalTestIsVisible = true
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
.error {
  color: #f04519;
  font-weight: 400;
  margin-top: 0.8rem;
}
p {
  color: $dark-purple;
  font-weight: bold;
}
</style>
