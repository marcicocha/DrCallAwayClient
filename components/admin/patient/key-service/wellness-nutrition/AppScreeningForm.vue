<template>
  <div>
    <a-form>
      <ValidationObserver ref="observer" tag="div">
        <AppSelect
          v-model="screeningFrequency"
          label="Screening Frquency"
          placeholder="Select Screening Frquency"
          name="Screening Frquency"
          :data="['Yearly', 'Bi-annually', 'Quarterly']"
          :remote="false"
          required
          rules="required"
        />
      </ValidationObserver>
      <br />
      <div class="t-c">
        <AppButton
          type="primary"
          :block="false"
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
import AppSelect from '@/components/AppSelect'
export default {
  name: 'AppScreeningForm',
  components: {
    ValidationObserver,
    AppSelect,
  },
  data() {
    return {
      screeningFrequency: '',
      isLoading: false,
    }
  },
  methods: {
    async submitHandler() {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      this.$emit('showScreeningPage', this.screeningFrequency)
    },
  },
}
</script>
