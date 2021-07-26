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
                :disabled="isDoctor"
              />
            </a-col>
            <a-col :span="12">
              <AppInput
                v-model="healthDetails.weight"
                label="Weight (kg)"
                required
                rules="required"
                name="weight"
                :disabled="isDoctor"
              />
            </a-col>
            <a-col :span="12">
              <AppInput
                v-model="healthDetails.height"
                label="Height (cm)"
                required
                rules="required"
                name="height"
                :disabled="isDoctor"
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
                    :data="['FGB', 'PGB']"
                    :remote="false"
                    :disabled="isDoctor"
                  />
                </a-col>
                <a-col :span="12">
                  <AppInput
                    v-model="healthDetails.glucose_value"
                    label="Enter the Value"
                    required
                    rules="required"
                    name="value"
                    :disabled="isDoctor"
                  />
                </a-col>
              </a-row>
            </a-col>
            <a-col :span="12">
              <AppSelect
                v-model="healthDetails.alcohol_intake"
                label="Alcohol Intake"
                name="alcohol intake"
                :data="['YES', 'NO']"
                :remote="false"
                :disabled="isDoctor"
              />
            </a-col>
            <a-col :span="12">
              <AppInput
                v-model="healthDetails.alcohol_frequency"
                label="If Yes, How many times per week?"
                :required="healthDetails.alcohol_intake === 'YES'"
                :rules="
                  healthDetails.alcohol_intake === 'YES' ? 'required' : ''
                "
                name="value"
                :disabled="healthDetails.alcohol_intake !== 'YES' || isDoctor"
              />
            </a-col>
            <a-col :span="12">
              <AppSelect
                v-model="healthDetails.smoke"
                label="Do you Smoke?"
                name="smoke"
                :data="['YES', 'NO']"
                :remote="false"
                :disabled="isDoctor"
              />
            </a-col>
            <a-col :span="12">
              <AppInput
                v-model="healthDetails.smoke_frequency"
                label="If Yes, How many sticks per week?"
                :required="healthDetails.smoke === 'YES'"
                :rules="healthDetails.smoke === 'YES' ? 'required' : ''"
                name="value"
                :disabled="healthDetails.smoke !== 'YES' || isDoctor"
              />
            </a-col>
            <a-col :span="16">
              <AppCheckboxGroup
                v-model="healthDetails.recurring"
                :options="options"
                :disabled="isDoctor"
              />
            </a-col>
            <a-col :span="8">
              <span>If Other, Please specify</span>
              <AppInput
                v-model="healthDetails.if_others"
                name="value"
                :disabled="healthDetails.recurring !== 'Other' || isDoctor"
              />
            </a-col>
            <a-col :span="24">
              <AppTextArea
                v-model="healthDetails.additional_info"
                label="Additional Information"
                :disabled="isDoctor"
              />
            </a-col>
          </a-row>
          <br />
          <div v-if="!isDoctor" class="t-c">
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
  props: {
    healthInfoObj: {
      type: Object,
      default: () => {},
    },
    mode: {
      type: String,
      default: 'patient',
    },
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
  computed: {
    isDoctor() {
      return this.mode === 'doctor'
    },
  },
  watch: {
    healthInfoObj: {
      handler(newHealthInfoObj) {
        if (!newHealthInfoObj) {
          this.healthDetails = {}
        } else {
          this.healthDetails = { ...newHealthInfoObj.medical_info }
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
        const obj = {
          medical_info: {
            ...this.healthDetails,
          },
          additional_info: this.healthDetails.additional_info,
        }
        const user = JSON.parse(localStorage.getItem('user'))
        const config = {
          headers: { Authorization: `Bearer ${user.token.token}` },
        }
        const response = await this.$axios.$post(
          'medical-histories',
          obj,
          config
        )
        await this.submitHealthHandler(response)
        console.log(response, 'RESPONSE')
        this.$notification.success({
          message: 'Success',
          description: response.message,
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
      submitHealthHandler: 'healthInformationModule/ADD_HEALTH_INFORMATION',
    }),
  },
}
</script>
