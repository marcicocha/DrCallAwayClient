<template>
  <a-modal
    :visible="modalIsVisible"
    width="500px"
    :confirm-loading="confirmLoading"
    :footer="null"
    :destroy-on-close="true"
    :mask-style="{ background: 'rgba(61, 12, 60, 0.9)' }"
    centered
    @cancel="closeModal"
  >
    <br />
    <div class="signIn">
      <div v-if="signInIsVisible">
        <div class="t-c">
          <h1>Login</h1>
          <p>Sign in to your DrCallAway<sup>TM</sup> account below</p>
        </div>
        <br />
        <div>
          <a-form>
            <ValidationObserver ref="obs1" tag="div">
              <AppInput
                v-model="userObject.email"
                placeholder="Email"
                required
                rules="required"
              />
              <AppPassword
                v-model="userObject.password"
                placeholder="Password"
                input-type="password"
                required
                rules="required"
              />
              <a-row type="flex" :gutter="16" align="middle"
                ><a-col :span="12"><AppCheckbox label="Remember me" /></a-col
                ><a-col :span="12"
                  ><p class="t-r fs-13">
                    <a @click="forgotPasswordIsVisibleHandler"
                      >Forgot Password</a
                    >
                  </p></a-col
                ></a-row
              >
            </ValidationObserver>
          </a-form>
          <a-row type="flex" :gutter="16"
            ><a-col :span="12"
              ><AppButton
                type="primary"
                :loading="isSignInLoading"
                @click="signInHandler"
                >Sign In</AppButton
              ></a-col
            >
            <a-col :span="12">
              <AppButton
                type="default"
                :loading="isSignUpLoading"
                @click="showSignUpModal('patient')"
                >Create an Account</AppButton
              >
            </a-col></a-row
          >
          <br />
          <br />
          <p class="t-c" style="font-size: 13px">
            By clicking “Sign In” you are agreeing to DrCallAway<sup>TM</sup>
            <br />
            <br />
            <nuxt-link to="terms-conditions">Terms and Conditions</nuxt-link>
          </p>
        </div>
      </div>
      <div v-if="signUpIsVisible">
        <div class="t-c">
          <h1>Create An Account</h1>
          <p>
            Please complete to create your account. All fields are compulsory
          </p>
        </div>
        <br />
        <div>
          <a-form>
            <ValidationObserver ref="obs2" tag="div">
              <AppSelect
                v-if="mode === 'practitioner'"
                v-model="signUpObject.type"
                placeholder="Practitioner"
                rules="required"
                required
                :remote="false"
                :data="[
                  'DOCTOR',
                  'NURSE',
                  'AMBULANCE',
                  'DIAGNOSTIC',
                  'PHARMACY',
                  'NUTRITIONIST',
                ]"
              />
              <a-row v-if="!isRegisteredName" type="flex" :gutter="16"
                ><a-col :span="12"
                  ><AppInput
                    v-model="signUpObject.first_name"
                    placeholder="First Name"
                    name="first name"
                    required
                    rules="required"
                  />
                </a-col>
                <a-col :span="12"
                  ><AppInput
                    v-model="signUpObject.last_name"
                    placeholder="Last Name"
                    name="Last Name"
                    required
                    rules="required"
                  />
                </a-col>
              </a-row>
              <AppInput
                v-if="isRegisteredName"
                v-model="signUpObject.registered_name"
                placeholder="Registered Name"
                name="Registered name"
                required
                rules="required"
              />
              <AppSelect
                v-if="signUpObject.type === 'DOCTOR'"
                v-model="signUpObject.specialty_id"
                placeholder="Select a Medical Specialty"
                name="medical specialties"
                url="/specialties?showAll=true"
                :call-back-func="
                  (resp) => ({
                    text: resp.name,
                    value: resp.id,
                  })
                "
                rules="required"
                required
                no-token
              />
              <AppSelect
                v-if="mode === 'patient'"
                v-model="signUpObject.gender"
                placeholder="Gender"
                name="gender"
                rules="required"
                required
                :remote="false"
                :data="['MALE', 'FEMALE']"
              />
              <AppInput
                v-model="signUpObject.mobile_phone_number"
                placeholder="Phone Number"
                required
                rules="required"
              />
              <AppInput
                v-model="signUpObject.email"
                placeholder="Email"
                type="email"
                required
                rules="required"
              />
              <AppInput
                v-if="signUpObject.type !== 'DOCTOR' && mode !== 'patient'"
                v-model="signUpObject.address"
                placeholder="Address"
                required
                rules="required"
              />
              <AppPassword
                v-model="signUpObject.password"
                placeholder="Password"
                input-type="password"
                required
                rules="required"
              />
              <AppInput
                v-model="signUpObject.password_confirmation"
                placeholder="Confirm Password"
                input-type="password"
                required
                rules="required"
              />
              <AppCheckbox label="I agree with terms and conditions" />
            </ValidationObserver>
          </a-form>
          <div class="t-c">
            <AppButton
              type="primary"
              :loading="isSignUpLoading"
              :block="false"
              @click="signUpHandler"
              >Register</AppButton
            >
            <br />
            <p>
              Already have an account?
              <a @click="showSignInModal">Sign In.</a>
            </p>
            <p v-if="mode === 'patient'">
              Provider?
              <a @click="showSignUpModal('practitioner')">Sign Up Here</a>
            </p>
            <p v-else>
              Patient?
              <a @click="showSignUpModal('patient')">Sign Up Here</a>
            </p>
          </div>
        </div>
      </div>
      <div v-if="forgotPasswordIsVisible">
        <div class="t-c">
          <h1>Forgot Your Password?</h1>
          <p>Enter your email and we'll send you a password reset link.</p>
        </div>
        <br />
        <a-form>
          <ValidationObserver ref="obs3" tag="div">
            <AppInput
              v-model="passwordObject.email"
              placeholder="Email"
              type="email"
              required
              rules="required"
            />
          </ValidationObserver>
        </a-form>
        <br />
        <div class="t-c">
          <AppButton
            type="primary"
            :loading="isforgotLoading"
            :block="false"
            @click="forgotPasswordHandler"
            >Send Request</AppButton
          >
          <br />
          <p>
            Back to
            <a @click="showSignInModal">Sign In.</a>
          </p>
        </div>
      </div>
    </div>
  </a-modal>
</template>
<script>
import { ValidationObserver } from 'vee-validate'
import { mapActions, mapState } from 'vuex'
import AppInput from '@/components/AppInput'
import AppCheckbox from '@/components/AppCheckbox'
import AppSelect from '@/components/AppSelect'
import AppButton from '@/components/AppButton'
import AppPassword from '@/components/AppPassword'
export default {
  name: 'AppManageSignInUp',
  components: {
    AppInput,
    AppCheckbox,
    AppButton,
    AppSelect,
    AppPassword,
    ValidationObserver,
  },
  props: {
    mode: {
      type: String,
      default: 'patient',
    },
    modalIsVisible: {
      type: Boolean,
      default: false,
    },
    signInIsVisible: {
      type: Boolean,
      default: false,
    },
    signUpIsVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isSignInLoading: false,
      isSignUpLoading: false,
      isforgotLoading: false,
      signUpObject: {},
      passwordObject: {},
      confirmLoading: false,
      userObject: {},
      forgotPasswordIsVisible: false,
    }
  },
  computed: {
    isRegisteredName() {
      return (
        this.signUpObject.type === 'DIAGNOSTIC' ||
        this.signUpObject.type === 'AMBULANCE' ||
        this.signUpObject.type === 'PHARMACY'
      )
    },
    ...mapState({
      allSubscription: (state) => state.subscriptionModule.subscriptionObj,
    }),
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
      this.forgotPasswordIsVisible = false
    },
    showSignUpModal(mode) {
      this.$emit('showSignUpModal', mode)
    },
    showSignInModal() {
      this.$emit('showSignInModal')
      this.forgotPasswordIsVisible = false
    },
    forgotPasswordIsVisibleHandler() {
      this.forgotPasswordIsVisible = true
      this.$emit('closeModalSignInHandler')
    },
    async signInHandler() {
      const isValid = await this.$refs.obs1.validate()
      if (!isValid) {
        return
      }
      this.isSignInLoading = true
      try {
        const { data } = await this.$axios.$post('login', this.userObject)
        await localStorage.setItem('user', JSON.stringify(data))
        await this.getSubscriptionHandler()
        if (data.is_first_time_login === 1) {
          this.$router.push(`/admin/profile`)
        } else {
          if (data.roles[0].name === 'patient' && !this.allSubscription) {
            this.$router.push('/admin/self-service/subscribe')
            return
          }
          this.$router.push(`/admin/${data.roles[0].name}`)
        }
        this.isSignInLoading = false
        this.closeModal()
      } catch (err) {
        this.isSignInLoading = false
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
    async signUpHandler() {
      const isValid = await this.$refs.obs2.validate()
      if (!isValid) {
        return
      }
      this.isSignUpLoading = true
      try {
        if (this.mode === 'practitioner') {
          if (this.signUpObject.type === 'DOCTOR') {
            await this.$axios.$post('doctors/signup', this.signUpObject)
            // localStorage.setItem('user', JSON.stringify(data))
          } else {
            const partnerObj = {
              type: this.signUpObject.type,
              members: [
                {
                  ...this.signUpObject,
                },
              ],
            }
            await this.$axios.$post('request/partners/signup', partnerObj)
            // localStorage.setItem('user', JSON.stringify(data))
          }
        } else {
          await this.$axios.$post('signup', this.signUpObject)
          // localStorage.setItem('user', JSON.stringify(data))
        }
        this.showSignInModal()
        this.isSignUpLoading = false
      } catch (err) {
        this.isSignUpLoading = false
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
    async forgotPasswordHandler() {
      const isValid = await this.$refs.obs3.validate()
      if (!isValid) {
        return
      }
      this.isforgotLoading = true
      try {
        await this.$axios.$post('forgot-password', this.userObject)
        this.$emit('showSignInModal')
        this.forgotPasswordIsVisible = false

        this.isforgotLoading = false
      } catch (err) {
        this.isforgotLoading = false
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
      getSubscriptionHandler: 'subscriptionModule/GET_SUBSCRIPTION',
    }),
  },
}
</script>
