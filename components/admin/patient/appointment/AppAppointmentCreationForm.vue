<template>
  <div>
    <a-form>
      <ValidationObserver ref="observer" tag="div">
        <AppInput
          v-model="appointmentObj.id"
          label="Appointment ID"
          name="appointment id"
          disabled
        />
        <AppInput
          v-if="status === 'patient'"
          v-model="appointmentObj.consultantName"
          label="Consultant Name"
          name="consultant name"
          disabled
        />
        <AppInput
          v-if="status !== 'patient'"
          v-model="appointmentObj.patientName"
          label="Patient Name"
          name="Patient name"
          disabled
        />
        <AppInput
          v-if="status === 'patient'"
          v-model="appointmentObj.description"
          label="Description"
          name="Description"
          disabled
        />
        <a-row type="flex" :gutter="24">
          <a-col :span="appointmentObj.screeningPlan ? 12 : 24">
            <AppDatePicker
              v-model="appointmentObj.date"
              label="Date of Visit"
              name="Date of Visit"
              disabled
            />
          </a-col>
          <a-col :span="appointmentObj.screeningPlan ? 12 : 24">
            <AppTimePicker
              v-model="appointmentObj.time"
              label="Time of Visit"
              name="Time of Visit"
              disabled
            />
          </a-col>
        </a-row>
        <a-row v-if="appointmentObj.screeningPlan" type="flex" :gutter="24">
          <a-col :span="12">
            <AppInput
              v-if="appointmentObj.screeningPlan"
              v-model="appointmentObj.screeningPlan"
              label="Screening Plan"
              name="Screening Plan"
              disabled
            />
          </a-col>
          <a-col :span="12">
            <AppInput
              v-if="appointmentObj.frequency"
              v-model="appointmentObj.frequency"
              label="Frequency"
              name="Frequency"
              disabled
            />
          </a-col>
        </a-row>
        <AppInput
          v-model="appointmentObj.status"
          label="Status"
          name="Status"
          disabled
        />
        <AppTextArea
          v-if="appointmentObj.addition_info"
          v-model="appointmentObj.addition_info"
          label="Test Instruction/Additional Information"
          disabled
        />
      </ValidationObserver>
      <div v-if="isResultLink" class="flex flex-jc-sb" style="margin-top: 1rem">
        <strong class="hide-for-mobile" style="color: #3d0c3c"
          >Test Result:</strong
        >
        <div class="test-result__container">
          <a class="red" :href="appointmentObj.test_result_link" target="_blank"
            >View</a
          >
          <a :href="appointmentObj.test_result_link" download
            ><img src="@/assets/images/admin/download.png" alt="download"
          /></a>
        </div>
      </div>
      <br />
      <div v-if="isPatientButtonOnly" class="t-c">
        <AppButton
          type="primary"
          :block="false"
          :loading="isLoading"
          class="admin-button"
          @click="submitHandler"
          >COMPLETED</AppButton
        >
      </div>
      <div v-if="isDoctorButtonOnly" class="t-c">
        <a-row type="flex" :gutter="16">
          <a-col :span="12">
            <AppButton
              type="primary"
              :loading="isLoading"
              class="admin-button"
              @click="$emit('acceptAppointmentHandler')"
              >ACCEPT</AppButton
            >
          </a-col>
          <a-col :span="12">
            <AppButton
              type="primary"
              :loading="isLoading"
              class="admin-button reject__btn"
              @click="$emit('rejectAppointmentHandler')"
              >REJECT</AppButton
            >
          </a-col>
        </a-row>
      </div>
    </a-form>
  </div>
</template>
<script>
import { ValidationObserver } from 'vee-validate'
import { mapActions } from 'vuex'
import moment from 'moment'
import AppInput from '@/components/AppInput'
import AppButton from '@/components/AppButton'
import AppDatePicker from '@/components/AppDatePicker'
import AppTimePicker from '@/components/AppTimePicker'
import AppTextArea from '@/components/AppTextArea'

export default {
  name: 'AppAppointmentCreationForm',
  components: {
    ValidationObserver,
    AppInput,
    AppButton,
    AppDatePicker,
    AppTimePicker,
    AppTextArea,
  },
  props: {
    currentAppointment: {
      type: Object,
      default: () => {},
    },
    status: {
      type: String,
      default: 'patient',
    },
  },
  data() {
    return {
      appointmentObj: {},
      isLoading: false,
    }
  },
  computed: {
    isPatientButtonOnly() {
      return (
        this.appointmentObj.status === 'BOOKED' &&
        this.status === 'patient' &&
        !this.appointmentObj.screeningPlan
      )
    },
    isDoctorButtonOnly() {
      return (
        this.appointmentObj.status === 'PENDING' && this.status !== 'patient'
      )
    },
    isResultLink() {
      return (
        this.appointmentObj.status === 'COMPLETED' &&
        this.status === 'patient' &&
        this.appointmentObj.test_result_link
      )
    },
  },
  watch: {
    currentAppointment: {
      handler(newCurrentAppointment) {
        if (!newCurrentAppointment) {
          this.appointmentObj = {}
        } else {
          if (this.status === 'patient') {
            this.appointmentObj = {
              ...newCurrentAppointment,
              consultantName: newCurrentAppointment.specialist
                ? `${newCurrentAppointment.specialist.user.first_name} ${newCurrentAppointment.specialist.user.last_name}`
                : newCurrentAppointment.specialist_data[0].first_name ||
                  newCurrentAppointment.specialist_data[0].last_name
                ? `${newCurrentAppointment.specialist_data[0].first_name} ${newCurrentAppointment.specialist_data[0].last_name}`
                : newCurrentAppointment.specialist_data[0].registered_name
                ? `${newCurrentAppointment.specialist_data[0].registered_name}`
                : newCurrentAppointment.service_center
                ? `${newCurrentAppointment.service_center.first_name} ${newCurrentAppointment.service_center.last_name}`
                : newCurrentAppointment.specialist_nutrition
                ? `${newCurrentAppointment.specialist_nutrition.first_name} ${newCurrentAppointment.specialist_nutrition.last_name}`
                : undefined,
              description: newCurrentAppointment.specialty
                ? newCurrentAppointment.specialty.name
                : newCurrentAppointment.description,
              time: newCurrentAppointment.time
                ? moment(newCurrentAppointment.time, 'HH:mm:ss')
                : undefined,
            }
            return
          }
          this.appointmentObj = {
            ...newCurrentAppointment,
            patientName:
              this.status !== 'patient'
                ? `${newCurrentAppointment.patient.first_name} ${newCurrentAppointment.patient.last_name}`
                : undefined,
            time: newCurrentAppointment.time
              ? moment(newCurrentAppointment.time, 'HH:mm:ss')
              : undefined,
          }
        }
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    async submitHandler() {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      this.isLoading = true
      try {
        const user = JSON.parse(localStorage.getItem('user'))
        const config = {
          headers: { Authorization: `Bearer ${user.token.token}` },
        }
        const { message } = await this.$axios.$patch(
          `appointments/complete/${this.appointmentObj.id}`,
          this.appointmentObj.id,
          config
        )
        this.$notification.success({
          message: 'Success',
          description: message,
          duration: 4000,
        })
        requestAnimationFrame(() => {
          this.$refs.observer.reset()
          this.isLoading = false
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
    ...mapActions({
      submitAppointmentHandler: 'appointmentModule/BOOK_APPOINTMENT',
    }),
  },
}
</script>
