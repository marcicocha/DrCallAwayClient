<template>
  <div>
    <a-form>
      <ValidationObserver ref="observer" tag="div">
        <AppInput
          v-model="appointmentObj.appointmentId"
          label="Appointment ID"
          name="appointment id"
          :disabled="isReadOnly"
        />
        <AppInput
          v-model="appointmentObj.consultantName"
          label="Consultant Name"
          name="consultant name"
          :disabled="isReadOnly"
        />
        <AppInput
          v-model="appointmentObj.description"
          label="Description"
          name="Description"
          :disabled="isReadOnly"
        />
        <AppInput
          v-model="appointmentObj.dateOfVisit"
          label="Date of Visit"
          name="Date of Visit"
          :disabled="isReadOnly"
        />
        <AppInput
          v-model="appointmentObj.timeOfVisit"
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
  },
  data() {
    return {
      appointmentObj: {},
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
          }
        }
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    submitHandler() {
      console.log('CLICKED')
    },
  },
}
</script>
