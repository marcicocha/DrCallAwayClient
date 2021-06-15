<template>
  <div>
    <a-form>
      <ValidationObserver ref="observer" tag="div">
        <AppSelect
          v-model="opticalObj.OpticalClinic"
          label="List of Optical Clinic"
          placeholder="Select a Optical Clinic"
          name="optical clinic"
          :data="['YES']"
          :remote="true"
        />
        <AppInput
          v-model="opticalObj.address"
          label="Clinic Address"
          name="clinic address"
        />
        <AppSelect
          v-model="opticalObj.opticalService"
          label="Optical Service"
          placeholder="Select a Optical Service"
          name="optical service"
          :data="['YES']"
          :remote="true"
        />
        <AppInput
          v-model="opticalObj.paymentCharge"
          label="Payment Charge"
          name="Payment charge"
        />
        <AppInput
          v-model="opticalObj.startDate"
          label="Select Start Date"
          name="select start date"
        />
        <AppInput
          v-model="opticalObj.startTime"
          label="Select Start Time"
          name="select start time"
        />
        <AppTextArea
          v-model="opticalObj.additionalInformation"
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
  name: 'AppOpticalForm',
  components: {
    ValidationObserver,
    AppInput,
    AppTextArea,
    AppSelect,
  },
  data() {
    return {
      opticalObj: {},
    }
  },
  methods: {
    submitHandler() {
      console.log('CLICKED')
    },
  },
}
</script>
