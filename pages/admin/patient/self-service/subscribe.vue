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
                disabled
              />
            </a-col>
            <a-col :span="12">
              <AppInput
                v-model="suscriptionObj.subscriptionPlan"
                label="Subscription Plan"
                name="Subscription Plan"
                disabled
              />
            </a-col>
            <a-col :span="12">
              <AppInput
                v-model="suscriptionObj.expiryDate"
                label="Expiry Date"
                name="Expiry Date"
                disabled
              />
            </a-col>
            <a-col :span="12">
              <AppInput
                v-model="suscriptionObj.status"
                label="Status"
                name="Status"
                disabled
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
                  required
                  rules="required"
                />
                <AppInput
                  v-model="currentSubscriptionObj.currentSubscriptionPlan"
                  label="Current Subscription Plan"
                  name="current subscription plan"
                  required
                  rules="required"
                />
              </div>
              <div v-else>
                <AppSelect
                  v-model="newSubscriptionObj.newSubscriptionType"
                  label="New Subscription Type"
                  name="New Subscription Type"
                  placeholder="New Subscription Type"
                  :data="['STANDARD']"
                  :remote="false"
                  required
                  rules="required"
                />
                <AppSelect
                  v-model="newSubscriptionObj.newSubscriptionPlan"
                  label="New Subscription Plan"
                  name="New Subscription Plan"
                  placeholder="New Subscription Plan"
                  :data="['STANDARD']"
                  :remote="false"
                  required
                  rules="required"
                />
              </div>
            </ValidationObserver>
            <br />
            <div class="t-c">
              <AppButton
                v-if="!paymentIsVisible"
                type="primary"
                :block="false"
                :loading="isLoading"
                class="admin-button"
                @click="submitSubcriptionHandler"
                >CONFIRM</AppButton
              >
              <AppPayment
                v-if="paymentIsVisible"
                :user-obj="user"
                @callback="callback"
              />
            </div>
          </a-form>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script>
import { ValidationObserver } from 'vee-validate'
import { mapActions, mapState } from 'vuex'
import AppInput from '@/components/AppInput'
import AppSelect from '@/components/AppSelect'
import AppTitleDivider from '@/components/AppTitleDivider'
import AppPayment from '@/components/AppPayment.vue'
export default {
  components: {
    AppInput,
    AppSelect,
    AppTitleDivider,
    ValidationObserver,
    AppPayment,
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
      paymentIsVisible: false,
      confirmLoading: false,
      user: {},
    }
  },
  computed: {
    ...mapState({
      allSubscription: (state) => state.subscriptionModule.subscriptionObj,
    }),
  },
  async mounted() {
    const userObject = JSON.parse(localStorage.getItem('user'))
    this.user = {
      email: userObject.email,
      firstName: userObject.first_name,
      lastName: userObject.last_name,
      amount: 100,
    }
    try {
      await this.submitSubscriptionHandler()
    } catch (err) {
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
      this.paymentIsVisible = false
    },
    close() {
      // this.paymentIsVisible = false
    },
    callback(res) {
      if (res.message === 'approved') {
        this.closeModal()
        this.$notification.success({
          message: res.message,
          description: 'Payment successful',
          duration: 4000,
        })
        requestAnimationFrame(() => {
          this.$refs.observer.reset()
          this.isLoading = false
          this.currentSubscriptionObj = {}
          this.newSubscriptionObj = {}
        })
      }
    },
    async submitSubcriptionHandler() {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      this.isLoading = true
      this.paymentIsVisible = true

      try {
        if (this.renewIsVisible) {
          const response = await this.submitRenewHandler(
            this.currentSubscriptionObj
          )
          this.$notification.success({
            message: 'Success',
            description: response,
            duration: 4000,
          })
        } else {
          const response = await this.submitChangeHandler(
            this.newSubscriptionObj
          )
          this.$notification.success({
            message: 'Success',
            description: response,
            duration: 4000,
          })
        }
        // this.paymentIsVisible = true
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
      submitSubscriptionHandler: 'subscriptionModule/GET_SUBSCRIPTION',
      submitRenewHandler: 'subscriptionModule/RENEW_SUBSCRIPTION',
      submitChangeHandler: 'subscriptionModule/CHANGE_SUBSCRIPTION',
    }),
  },
}
</script>
<style lang="scss" scoped>
h6 {
  color: $dark-purple;
}
</style>
