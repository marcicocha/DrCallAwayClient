<template>
  <div>
    <div>
      <AppTitleDivider title="Subscription Information" />
      <div class="admin-wrapper">
        <a-form>
          <a-row type="flex" :gutter="16">
            <a-col :span="12">
              <AppInput
                v-model="subscriptionObj.type"
                label="Subscription Type"
                name="Subscription Type"
                disabled
              />
            </a-col>
            <a-col :span="12">
              <AppInput
                v-model="subscriptionObj.plan"
                label="Subscription Plan"
                name="Subscription Plan"
                disabled
              />
            </a-col>
            <a-col :span="12">
              <AppInput
                v-model="subscriptionObj.end"
                label="Expiry Date"
                name="Expiry Date"
                disabled
              />
            </a-col>
            <a-col :span="12">
              <AppInput
                v-model="subscriptionObj.status"
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
                  v-model="subscriptionObj.type"
                  label="Current Subscription Type"
                  name="Current Subscription Type"
                  disabled
                />
                <AppInput
                  v-model="subscriptionObj.plan"
                  label="Current Subscription Plan"
                  name="current subscription plan"
                  disabled
                />
                <br />
                <h6 class="red t-c">
                  {{ `Amount: N${subscriptionObj.amount}` }}
                </h6>
              </div>
              <div v-else>
                <AppSelect
                  v-model="newSubscriptionObj.type"
                  label="New Subscription Type"
                  name="New Subscription Type"
                  placeholder="New Subscription Type"
                  :data="['Standard', 'Premium']"
                  :remote="false"
                  required
                  rules="required"
                />
                <AppSelect
                  v-model="newSubscriptionObj.plan"
                  label="New Subscription Plan"
                  name="New Subscription Plan"
                  placeholder="New Subscription Plan"
                  :url="`subscriptions/plans/${newSubscriptionObj.type}`"
                  :call-back-func="
                    (resp) => ({
                      text: resp.plan,
                      value: resp.plan,
                      amount: resp.amount,
                    })
                  "
                  required
                  rules="required"
                  :disabled="!newSubscriptionObj.type"
                  @selectedObject="selectedObjectHandler"
                />
                <div v-if="newSubscriptionObj.amount">
                  <br />
                  <h6 class="red t-c">
                    {{ `Amount: N${newSubscriptionObj.amount}` }}
                  </h6>
                </div>
              </div>
            </ValidationObserver>
            <br />
            <div class="t-c">
              <!-- <AppButton
                type="primary"
                :block="false"
                :loading="isLoading"
                class="admin-button"
                @click="submitSubcriptionHandler"
                >CONFIRM</AppButton
              > -->
              <AppPayment :user-obj="user" @callback="callback">
                CONFIRM
              </AppPayment>
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
    const userObject = JSON.parse(localStorage.getItem('user'))
    return {
      // suscriptionObj: {},
      isLoading: false,
      modalIsVisible: false,
      renewIsVisible: false,
      changeIsVisible: false,
      currentSubscriptionObj: {},
      newSubscriptionObj: {},
      paymentIsVisible: false,
      confirmLoading: false,
      user: {},
      planArray: [],
      userObject,
    }
  },
  computed: {
    subscriptionObj() {
      if (this.allSubscription === null) {
        return {}
      }
      const obj = {
        ...this.allSubscription,
        status: this.allSubscription.active === 1 ? 'ACTIVE' : 'INACTIVE',
      }
      return { ...obj }
    },
    ...mapState({
      allSubscription: (state) => state.subscriptionModule.subscriptionObj,
    }),
  },
  async mounted() {
    this.user = {
      email: this.userObject.email,
      firstName: this.userObject.first_name,
      lastName: this.userObject.last_name,
    }
    try {
      await this.getSubscriptionHandler()
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
        this.user.amount = this.subscriptionObj.amount
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
    selectedObjectHandler(rcd) {
      this.newSubscriptionObj.amount = rcd.amount
      this.user.amount = rcd.amount
    },
    async callback(res) {
      if (res.message === 'Approved') {
        this.$notification.success({
          message: res.message,
          description: 'Payment successful',
          duration: 4000,
        })
        try {
          if (this.renewIsVisible) {
            const message = await this.submitRenewHandler(this.subscriptionObj)
            this.$notification.success({
              message: 'Success',
              description: message,
              duration: 4000,
            })
          } else {
            const message = await this.submitChangeHandler(
              this.newSubscriptionObj
            )
            this.$notification.success({
              message: 'Success',
              description: message,
              duration: 4000,
            })
          }
          requestAnimationFrame(() => {
            this.$refs.observer.reset()
            this.isLoading = false
            this.currentSubscriptionObj = {}
            this.newSubscriptionObj = {}
            this.closeModal()
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
      }
    },
    async submitSubcriptionHandler() {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      this.isLoading = true
      this.paymentIsVisible = true
    },
    ...mapActions({
      getSubscriptionHandler: 'subscriptionModule/GET_SUBSCRIPTION',
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
.red {
  color: #e74353 !important;
}
</style>
