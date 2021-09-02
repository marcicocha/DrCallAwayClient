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
        <AppDatePicker
          v-model="appointmentObj.date"
          label="Date of Visit"
          name="Date of Visit"
          disabled
        />
        <AppTimePicker
          v-model="appointmentObj.time"
          label="Time of Visit"
          name="Time of Visit"
          disabled
        />
        <AppInput
          v-model="appointmentObj.status"
          label="Status"
          name="Status"
          disabled
        />
      </ValidationObserver>
      <br />
      <div v-if="isReadOnly" class="t-c">
        <AppButton
          type="primary"
          :block="false"
          :loading="isLoading"
          class="admin-button"
          @click="submitHandler"
          >COMPLETED</AppButton
        >
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

export default {
  name: 'AppAppointmentCreationForm',
  components: {
    ValidationObserver,
    AppInput,
    AppButton,
    AppDatePicker,
    AppTimePicker,
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
    isReadOnly() {
      return (
        this.appointmentObj.status === 'BOOKED' && this.status === 'patient'
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
                : newCurrentAppointment.specialist_data
                ? `${newCurrentAppointment.specialist_data[0].first_name} ${newCurrentAppointment.specialist_data[0].last_name}`
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
