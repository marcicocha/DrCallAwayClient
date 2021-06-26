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
                v-model="healthDetails.heart_rate"
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
                    v-model="healthDetails.glucose_level"
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
                    v-model="healthDetails.glucose_value"
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
                v-model="healthDetails.alcohol_intake"
                label="Alcohol Intake"
                name="alcohol intake"
                :data="['HIGH']"
                :remote="true"
              />
            </a-col>
            <a-col :span="12">
              <AppInput
                v-model="healthDetails.alcohol_frequency"
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
                v-model="healthDetails.smoke_frequency"
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
                v-model="healthDetails.if_others"
                name="value"
                :disabled="healthDetails.recurring !== 'Others'"
              />
            </a-col>
            <a-col :span="24">
              <AppTextArea
                v-model="additional_information"
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
import { mapActions } from 'vuex'
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
      additional_information: undefined,
      options: [
        'Asthma',
        'Diabetes',
        'High Blood Pressure',
        'Sickle Cell',
        'Other',
      ],
    }
  },
  methods: {
    async submitHandler() {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      this.isLoading = true
      try {
        const obj = {
          medical_info: {
            ...this.healthDetails,
          },
          additional_info: this.additional_information,
        }
        const response = this.submitHealthHandler(obj)
        this.$notification.success({
          message: 'Success',
          description: response.successMessage,
          duration: 4000,
        })
        this.isLoading = false
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
      submitHealthHandler: 'healthInformationModule/ADD_HEALTH_INFORMATION',
    }),
  },
}
</script>
