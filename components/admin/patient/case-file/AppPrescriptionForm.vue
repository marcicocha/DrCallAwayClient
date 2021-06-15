<template>
  <div>
    <a-row :type="flex" :gutter="24">
      <a-col :span="8">
        <AppInput
          v-model="prescriptionObj.nameDrug"
          label="NAME OF DRUG"
          placeholder="Enter Name of Drug"
          name="name of drug"
        />
      </a-col>
      <a-col :span="8">
        <AppInput
          v-model="prescriptionObj.dosage"
          label="DOSAGE"
          placeholder="Enter Days"
          name="dosage"
        />
      </a-col>
      <a-col :span="8">
        <AppInput
          v-model="prescriptionObj.duration"
          label="DURATION (DAYS)"
          placeholder="Enter Days"
          name="duration"
        />
      </a-col>
    </a-row>
    <br />
    <p class="t-r"><a>Add More</a></p>
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
  </div>
</template>
<script>
import AppInput from '@/components/AppInput'
import AppButton from '@/components/AppButton'
export default {
  name: 'AppPrescriptionForm',
  components: {
    AppInput,
    AppButton,
  },
  data() {
    return {
      prescriptionObj: {},
      isLoading: false,
    }
  },
}
</script>
<style lang="scss" scoped>
p {
  font-weight: bold;
  a {
    color: $medium-purple;
  }
}
</style>
