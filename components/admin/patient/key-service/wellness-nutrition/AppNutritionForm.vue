<template>
  <div>
    <a-form>
      <ValidationObserver ref="observer" tag="div">
        <AppSelect
          v-model="nutritionistObj.nutritionist"
          label="List of Nutritionist"
          placeholder="Select a Nutritionist"
          name="nurse"
          :data="['YES']"
          :remote="true"
        />
        <AppInput
          v-model="nutritionistObj.address"
          label="Nutritionist Address"
          name="nutritionist address"
        />
        <AppInput
          v-model="nutritionistObj.paymentCharge"
          label="Payment Charge"
          name="Payment charge"
        />
        <AppInput
          v-model="nutritionistObj.paymentCharge"
          label="Payment Charge"
          name="Payment charge"
        />
        <AppInput
          v-model="nutritionistObj.startDate"
          label="Select Start Date"
          name="select start date"
        />
        <AppInput
          v-model="nutritionistObj.startTime"
          label="Select Start Time"
          name="select start time"
        />
        <AppTextArea
          v-model="nutritionistObj.additionalInformation"
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
  name: 'AppNutritionForm',
  components: {
    ValidationObserver,
    AppInput,
    AppSelect,
    AppTextArea,
  },
  data() {
    return {
      nutritionistObj: {},
    }
  },
  methods: {
    submitHandler() {
      console.log('CLICKED')
    },
  },
}
</script>
