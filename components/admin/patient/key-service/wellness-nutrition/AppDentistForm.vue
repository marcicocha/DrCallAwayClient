<template>
  <div>
    <a-form>
      <ValidationObserver ref="observer" tag="div">
        <AppSelect
          v-model="dentistObj.dentalClinic"
          label="List of Dental Clinic"
          placeholder="Select a Dental Clinic"
          name="dental clinic"
          :data="['YES']"
          :remote="true"
        />
        <AppInput
          v-model="dentistObj.address"
          label="Clinic Address"
          name="clinic address"
        />
        <AppSelect
          v-model="dentistObj.dentalService"
          label="Dental Service"
          placeholder="Select a Dental Service"
          name="dental service"
          :data="['YES']"
          :remote="true"
        />
        <AppInput
          v-model="dentistObj.paymentCharge"
          label="Payment Charge"
          name="Payment charge"
        />

        <AppInput
          v-model="dentistObj.startDate"
          label="Select Start Date"
          name="select start date"
        />
        <AppInput
          v-model="dentistObj.startTime"
          label="Select Start Time"
          name="select start time"
        />
        <AppTextArea
          v-model="dentistObj.additionalInformation"
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
  </div>
</template>
<script>
import { ValidationObserver } from 'vee-validate'
import AppInput from '@/components/AppInput'
import AppSelect from '@/components/AppSelect'
import AppTextArea from '@/components/AppTextArea'

export default {
  name: 'AppDentistForm',
  components: {
    ValidationObserver,
    AppInput,
    AppTextArea,
    AppSelect,
  },
  data() {
    return {
      dentistObj: {},
    }
  },
  methods: {
    submitHandler() {
      console.log('CLICKED')
    },
  },
}
</script>
