<template>
  <div>
    <AppTitleDivider title="Health Information" />
    <br />
    <div>
      <a-form>
        <ValidationObserver ref="observer" tag="div">
          <a-row type="flex" :gutter="24">
            <a-col :span="12">
              <AppInput
                v-model="healthDetails.heartRate"
                label="Heart Rate"
                required
                rules="required"
                name="heart rate"
              />
            </a-col>
            <a-col :span="12">
              <AppInput
                v-model="healthDetails.weight"
                label="Weight (kg)"
                required
                rules="required"
                name="weight"
              />
            </a-col>
            <a-col :span="12">
              <AppInput
                v-model="healthDetails.height"
                label="Height (cm)"
                required
                rules="required"
                name="height"
              />
            </a-col>
            <a-col :span="12">
              <a-row type="flex" :gutter="12">
                <a-col :span="12">
                  <AppSelect
                    v-model="healthDetails.glucoseLevel"
                    label="Glucose Level"
                    required
                    rules="required"
                    name="glucose level"
                    :data="['HIGH']"
                    :remote="true"
                  />
                </a-col>
                <a-col :span="12">
                  <AppInput
                    v-model="healthDetails.glucoseValue"
                    label="Enter the Value"
                    required
                    rules="required"
                    name="value"
                  />
                </a-col>
              </a-row>
            </a-col>
            <a-col :span="12">
              <AppSelect
                v-model="healthDetails.alcoholIntake"
                label="Alcohol Intake"
                name="alcohol intake"
                :data="['HIGH']"
                :remote="true"
              />
            </a-col>
            <a-col :span="12">
              <AppInput
                v-model="healthDetails.howManyTimes"
                label="If Yes, How many times per week?"
                :required="healthDetails.alcoholIntake"
                :rules="healthDetails.alcoholIntake ? 'required' : ''"
                name="value"
                :disabled="!healthDetails.alcoholIntake"
              />
            </a-col>
            <a-col :span="12">
              <AppSelect
                v-model="healthDetails.smoke"
                label="Do you Smoke?"
                name="smoke"
                :data="['YES']"
                :remote="true"
              />
            </a-col>
            <a-col :span="12">
              <AppInput
                v-model="healthDetails.howManyStick"
                label="If Yes, How many sticks per week?"
                :required="healthDetails.smoke"
                :rules="healthDetails.smoke ? 'required' : ''"
                name="value"
                :disabled="!healthDetails.smoke"
              />
            </a-col>
            <a-col :span="16">
              <AppCheckboxGroup
                v-model="healthDetails.recurring"
                :options="options"
              />
            </a-col>
            <a-col :span="8">
              <span>If Other, Please specify</span>
              <AppInput
                v-model="healthDetails.ifOthers"
                name="value"
                :disabled="healthDetails.recurring !== 'Others'"
              />
            </a-col>
            <a-col :span="24">
              <AppTextArea
                v-model="healthDetails.additionalInformation"
                label="Additional Information"
              />
            </a-col>
          </a-row>
          <br />
          <div class="t-c">
            <AppButton
              type="primary"
              :block="false"
              :loading="isLoading"
              class="admin-button"
              @click="submitHandler"
              >Save</AppButton
            >
          </div>
        </ValidationObserver>
      </a-form>
    </div>
  </div>
</template>
<script>
import { ValidationObserver } from 'vee-validate'
import AppTitleDivider from '@/components/AppTitleDivider'
import AppInput from '@/components/AppInput'
import AppSelect from '@/components/AppSelect'
import AppCheckboxGroup from '@/components/AppCheckboxGroup'
import AppTextArea from '@/components/AppTextArea'
import AppButton from '@/components/AppButton'
export default {
  name: 'AppHealthInformationForm',
  components: {
    AppTitleDivider,
    AppInput,
    ValidationObserver,
    AppSelect,
    AppCheckboxGroup,
    AppTextArea,
    AppButton,
  },
  data() {
    return {
      healthDetails: {},
      isLoading: false,
      options: [
        'Asthma',
        'Diabetes',
        'High Blood Pressure',
        'Sickle Cell',
        'Other',
      ],
    }
  },
}
</script>
