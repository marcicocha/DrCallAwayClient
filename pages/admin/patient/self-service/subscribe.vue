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
          <br />
          <div class="t-c">
            <AppButton
              type="default"
              :block="false"
              :loading="isLoading"
              class="admin-button"
              style="margin-right: 1rem"
              @click="submitHandler('renew')"
              >RENEW PLAN</AppButton
            >
            <AppButton
              type="primary"
              :block="false"
              :loading="isLoading"
              class="admin-button"
              @click="submitHandler('change')"
              >CHANGE PLAN</AppButton
            >
          </div>
        </a-form>
      </div>
    </div>
    <a-modal
      :visible="modalIsVisible"
      width="420px"
      :confirm-loading="confirmLoading"
      :footer="null"
      :destroy-on-close="true"
      :mask-style="{ background: 'rgba(61, 12, 60, 0.9)' }"
      centered
      @cancel="closeModal"
    >
      <div>
        <h6 class="t-c">
          {{ renewIsVisible ? 'Renew Plan' : 'Renew Different Plan' }}
        </h6>
        <a-divider />
        <div>
          <a-form>
            <ValidationObserver ref="observer" tag="div">
              <div v-if="renewIsVisible">
                <AppInput
                  v-model="currentSubscriptionObj.currentSubscriptionType"
                  label="Current Subscription Type"
                  name="Current Subscription Type"
                />
                <AppInput
                  v-model="currentSubscriptionObj.currentSubscriptionPlan"
                  label="Current Subscription Plan"
                  name="current subscription plan"
                />
              </div>
              <div v-else>
                <AppSelect
                  v-model="newSubscriptionObj.newSubscriptionType"
                  label="New Subscription Type"
                  name="New Subscription Type"
                  placeholder="New Subscription Type"
                  :data="['STANDARD']"
                  :remote="true"
                />
                <AppSelect
                  v-model="newSubscriptionObj.newSubscriptionPlan"
                  label="New Subscription Plan"
                  name="New Subscription Plan"
                  placeholder="New Subscription Plan"
                  :data="['STANDARD']"
                  :remote="true"
                />
              </div>
            </ValidationObserver>
            <br />
            <div class="t-c">
              <AppButton
                type="primary"
                :block="false"
                :loading="isLoading"
                class="admin-button"
                @click="submitSubcriptionHandler"
                >CONFIRM</AppButton
              >
            </div>
          </a-form>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script>
import AppInput from '@/components/AppInput'
import AppSelect from '@/components/AppSelect'
import AppTitleDivider from '@/components/AppTitleDivider'
export default {
  components: {
    AppInput,
    AppSelect,
    AppTitleDivider,
  },
  layout: 'dashboard',
  data() {
    return {
      suscriptionObj: {},
      isLoading: false,
      modalIsVisible: false,
      renewIsVisible: false,
      changeIsVisible: false,
      currentSubscriptionObj: {},
      newSubscriptionObj: {},
    }
  },
  methods: {
    submitHandler(key) {
      this.modalIsVisible = true
      if (key === 'renew') {
        this.renewIsVisible = true
        this.changeIsVisible = false
      } else {
        this.changeIsVisible = true
        this.renewIsVisible = false
      }
      console.log('CLICKED')
    },
    closeModal() {
      this.modalIsVisible = false
    },
    submitSubcriptionHandler() {
      console.log('CLICKED')
    },
  },
}
</script>
<style lang="scss" scoped>
h6 {
  color: $dark-purple;
}
</style>
