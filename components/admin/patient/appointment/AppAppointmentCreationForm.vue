<template>
  <div>
    <a-form>
      <ValidationObserver ref="observer" tag="div">
        <AppInput
          v-model="appointmentObj.id"
          label="Appointment ID"
          name="appointment id"
          :disabled="isReadOnly"
        />
        <AppInput
          v-if="status === 'patient'"
          v-model="appointmentObj.consultantName"
          label="Consultant Name"
          name="consultant name"
          :disabled="isReadOnly"
        />
        <AppInput
          v-if="status === 'doctor'"
          v-model="appointmentObj.patientName"
          label="Patient Name"
          name="Patient name"
          :disabled="isReadOnly"
        />
        <AppInput
          v-model="appointmentObj.description"
          label="Description"
          name="Description"
          :disabled="isReadOnly"
        />
        <AppInput
          v-model="appointmentObj.date"
          label="Date of Visit"
          name="Date of Visit"
          :disabled="isReadOnly"
        />
        <AppInput
          v-model="appointmentObj.time"
          label="Time of Visit"
          name="Time of Visit"
          :disabled="isReadOnly"
        />
        <AppInput
          v-model="appointmentObj.status"
          label="Status"
          name="Status"
          :disabled="isReadOnly"
        />
      </ValidationObserver>
      <br />
      <div class="t-c">
        <AppButton
          v-if="!isReadOnly"
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
import AppInput from '@/components/AppInput'
import AppButton from '@/components/AppButton'

export default {
  name: 'AppAppointmentCreationForm',
  components: {
    ValidationObserver,
    AppInput,
    AppButton,
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
      return this.appointmentObj.status !== 'Booked'
    },
  },
  watch: {
    currentAppointment: {
      handler(newcurrentAppointment) {
        if (!newcurrentAppointment) {
          this.appointmentObj = {}
        } else {
          this.appointmentObj = {
            ...newcurrentAppointment,
            consultantName: `${newcurrentAppointment.specialist.user.first_name} ${newcurrentAppointment.specialist.user.last_name}`,
            description: newcurrentAppointment.specialty.name,
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
        const response = await this.submitAppointmentHandler(
          this.appointmentObj
        )
        this.$notification.success({
          message: 'Success',
          description: response,
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
