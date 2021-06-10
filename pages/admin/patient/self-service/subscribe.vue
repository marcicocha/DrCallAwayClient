<template>
  <div>
    <div>
      <AppTitleDivider title="Subscription Information" />
      <div class="admin-wrapper">
        <a-form>
          <a-row type="flex" :gutter="16">
            <a-col :span="12">
              <AppInput
                v-model="suscriptionObj.subscriptionType"
                label="Subscription Type"
                name="Subscription Type"
              />
            </a-col>
            <a-col :span="12">
              <AppInput
                v-model="suscriptionObj.subscriptionPlan"
                label="Subscription Plan"
                name="Subscription Plan"
              />
            </a-col>
            <a-col :span="12">
              <AppInput
                v-model="suscriptionObj.expiryDate"
                label="Expiry Date"
                name="Expiry Date"
              />
            </a-col>
            <a-col :span="12">
              <AppInput
                v-model="suscriptionObj.status"
                label="Status"
                name="Status"
              />
            </a-col>
          </a-row>
          <br />
          <div class="t-c">
            <AppButton
              type="default"
              :block="false"
              :loading="isLoading"
              class="admin-button"
              @click="submitHandler"
              >RENEW PLAN</AppButton
            >
            <AppButton
              type="primary"
              :block="false"
              :loading="isLoading"
              class="admin-button"
              @click="submitHandler"
              >CHANGE PLAN</AppButton
            >
          </div>
        </a-form>
      </div>
    </div>
  </div>
</template>
<script>
import AppInput from '@/components/AppInput'
// import AppSelect from '@/components/AppSelect'
import AppTitleDivider from '@/components/AppTitleDivider'
export default {
  layout: 'dashboard',
  components: {
    AppInput,
    // AppSelect,
    AppTitleDivider,
  },
  data() {
    return {
      suscriptionObj: {},
      isLoading: false,
    }
  },
  methods: {
    submitHandler() {
      console.log('CLICKED')
    },
  },
}
</script>
