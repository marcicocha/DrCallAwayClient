<template>
  <div>
    <a-form>
      <ValidationObserver ref="observer" tag="div">
        <AppInput
          v-model="ailmentObj.ailment"
          label="Ailment"
          name="ailment"
          required
          rules="required"
        />
        <AppTextArea
          v-model="ailmentObj.additionalInformation"
          label="Tell us how you feel"
        />
        <p>Not more than 200 words</p>
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

export default {
  name: 'AppDentistForm',
  components: {
    ValidationObserver,
    AppInput,
  },
}
</script>
