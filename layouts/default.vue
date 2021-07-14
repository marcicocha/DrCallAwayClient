<template>
  <div>
    <header
      ref="scroll"
      :class="{
        header: true,
        open: overlayIsVisible,
      }"
    >
      <div
        :class="{
          overlay: true,
          'fade-in': overlayIsVisible,
          'fade-out': !overlayIsVisible,
        }"
      ></div>
      <nav class="flex flex-jc-sb flex-ai-c">
        <nuxt-link to="/" class="header__logo" @click="showOverlay"
          ><img src="@/assets/images/logo.png" alt="logo"
        /></nuxt-link>

        <div
          id="btnHamburger"
          class="header__toggle hide-for-desktop"
          @click="showOverlay"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div class="header__links flex flex-jc-sb flex-ai-c hide-for-mobile">
          <div class="select_container m-lr">
            <div class="flex flex-ai-c" @click="showSelectField(1)">
              <p>Our Services</p>
              <span class="arrow-down"
                ><img src="@/assets/images/arrow-down.svg" alt="arrow-down"
              /></span>
            </div>
            <div
              :class="{
                display__block: visible1,
                display__none: !visible1,
                'fade-in': visible1,
                'fade-out': !visible1,
              }"
              class="dropdown"
            >
              <nuxt-link to="key-services"
                ><span @click="hideDropdown">Key Services</span></nuxt-link
              >
              <nuxt-link to="special-services"
                ><span @click="hideDropdown">Special Services</span></nuxt-link
              >
            </div>
          </div>
          <nuxt-link to="how-it-works"
            ><span class="m-lr" @click="hideDropdown"
              >How It Works</span
            ></nuxt-link
          >
          <div class="select_container m-lr">
            <div class="flex flex-ai-c" @click="showSelectField(2)">
              <p>About Us</p>
              <span class="arrow-down"
                ><img src="@/assets/images/arrow-down.svg" alt="arrow-down"
              /></span>
            </div>
            <div
              :class="{
                display__block: visible2,
                display__none: !visible2,
                'fade-in': visible2,
                'fade-out': !visible2,
              }"
              class="dropdown"
            >
              <nuxt-link to="corporate-information"
                ><span @click="hideDropdown"
                  >Corporate Information</span
                ></nuxt-link
              >
              <nuxt-link to="our-team"
                ><span @click="hideDropdown">Our Team</span></nuxt-link
              >
            </div>
          </div>
          <nuxt-link to="subscription"
            ><span class="m-lr" @click="hideDropdown"
              >Subscription</span
            ></nuxt-link
          >
          <button
            to="contact"
            class="button header__button"
            @click="showSignInModal"
          >
            Talk To A Medical Practitioner
          </button>
        </div>
        <!-- <div class="hide-for-mobile">
          <div class="flex flex-jc-sb flex-ai-c"></div>
        </div> -->
      </nav>
      <div
        :class="{
          header__menu: true,
          display__none: !overlayIsVisible,
          display__block: overlayIsVisible,
          'fade-in': overlayIsVisible,
          'fade-out': !overlayIsVisible,
        }"
      >
        <div class="header__links hide-for-desktop">
          <div class="header__links-anchor-container">
            <div>
              <p @click="showSelectField(1)">Our Services</p>
              <div
                :class="{
                  child__link: true,
                  display__block: visible1,
                  display__none: !visible1,
                  'fade-in': visible1,
                  'fade-out': !visible1,
                }"
              >
                <nuxt-link to="key-services"
                  ><span @click="showOverlay">Key Services</span></nuxt-link
                >
                <nuxt-link to="special-services"
                  ><span @click="showOverlay">Special Services</span></nuxt-link
                >
              </div>
            </div>
          </div>
          <div class="header__links-anchor-container" @click="showOverlay">
            <nuxt-link to="how-it-works"><span>How It Works</span></nuxt-link>
          </div>
          <div class="header__links-anchor-container">
            <div>
              <p @click="showSelectField(2)">About Us</p>
              <div
                :class="{
                  child__link: true,
                  display__block: visible2,
                  display__none: !visible2,
                  'fade-in': visible2,
                  'fade-out': !visible2,
                }"
              >
                <nuxt-link to="corporate-information"
                  ><span @click="showOverlay"
                    >Corporate Information</span
                  ></nuxt-link
                >
                <nuxt-link to="our-team"
                  ><span @click="showOverlay">Our Team</span></nuxt-link
                >
              </div>
            </div>
          </div>
          <div class="header__links-anchor-container" @click="showOverlay">
            <nuxt-link to="subscription"><span>Subscription</span></nuxt-link>
          </div>
          <button
            to="contact"
            class="button header__button"
            style="
              margin-top: 3rem;
              margin-left: 0;
              padding: 0.5rem 0.2rem;
              width: 100%;
            "
            @click="showSignInModal"
          >
            Talk To A Medical Practitioner
          </button>
        </div>
      </div>
    </header>
    <div style="min-height: 40px; padding-top: 120px">
      <Nuxt />
    </div>
    <footer>
      <section>
        <div class="flex flex-ai-c flex-jc-sb subscribe">
          <div class="subscribe__text">
            <h5>Get Healthy Tips, Subscribe Now</h5>
          </div>
          <div class="subscribe__form">
            <input type="text" />
            <button class="button">Subscribe</button>
          </div>
        </div>
      </section>
      <section class="container">
        <div>
          <div class="flex flex-jc-sb">
            <div class="image-container">
              <img src="@/assets/images/logo.png" alt="logo" class="logo" />
              <p>
                Savon Nettoyage Nigeria is a telehealth company and manages the
                DrCallAway<sup>TM</sup> service in Nigeria.
              </p>
            </div>
            <div class="link-container">
              <h6>Useful Link</h6>
              <div class="flex flex-jc-sb">
                <div>
                  <nuxt-link to="corporate-information"
                    ><span>Corporate Information</span></nuxt-link
                  >
                  <nuxt-link to="FAQs"><span>FAQs</span></nuxt-link>
                  <nuxt-link to="our-team"><span>Our Team</span></nuxt-link>
                </div>
                <div>
                  <a @click="showSignUpModal('practitioner')"
                    ><span>Practitioner Registration</span></a
                  >
                  <nuxt-link to="privacy-policy"
                    ><span>Privacy Policy</span></nuxt-link
                  >
                  <nuxt-link to="terms-conditions"
                    ><span>Terms and Conditions</span></nuxt-link
                  >
                </div>
              </div>
            </div>
            <div class="download-container">
              <h6>Download Our Free App</h6>
              <div class="social-links">
                <div>
                  <img src="@/assets/images/app-store.png" alt="app-store" />
                </div>
                <div>
                  <img
                    src="@/assets/images/google-play.png"
                    alt="google-play"
                  />
                </div>
              </div>
              <div class="social-links p-t2">
                <div>
                  <a href=""
                    ><img src="@/assets/images/facebook.png" alt="facebook"
                  /></a>
                </div>
                <div>
                  <a href=""
                    ><img src="@/assets/images/instagram.png" alt="instagram"
                  /></a>
                </div>
                <div>
                  <a href=""
                    ><img src="@/assets/images/twitter.png" alt="twitter"
                  /></a>
                </div>
              </div>
            </div>
          </div>
          <div class="p-t2">
            <hr />
            <small
              >“DrCallAway <sup>TM</sup> is not a Pharmacy. We do not carry nor
              ship medicines. Online prescriptions made by our doctors are sent
              to the subscriber or our partner pharmacy according to the
              subscriber”s choice, after an online medical consultation. Similar
              to a physical consultation with a doctor, subscription fee does
              not include payment for medications prescribed. A subscriber is
              responsible for paying out of pocket for his medications”.</small
            >
          </div>
        </div>
      </section>
      <section>
        Copyright © {{ year }} DrCallAway <sup>TM</sup> All Rights Reserved
      </section>
    </footer>
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
            <p>Sign in to your DrCallAwayTM account below</p>
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
                <AppInput
                  v-model="userObject.password"
                  placeholder="Password"
                  input-type="password"
                  required
                  rules="required"
                />
                <a-row type="flex" :gutter="16" align="middle"
                  ><a-col :span="12"><AppCheckbox label="Remember me" /></a-col
                  ><a-col :span="12"
                    ><p class="t-r">
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
                    'DIAGNOTIC',
                    'PHARMACY',
                    'NUTRITIONIST',
                  ]"
                />
                <a-row type="flex" :gutter="16"
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
                      name="last name"
                      required
                      rules="required"
                    />
                  </a-col>
                </a-row>
                <AppSelect
                  v-if="signUpObject.type === 'DOCTOR'"
                  v-model="signUpObject.specialtyId"
                  placeholder="Select a Medical Specialty"
                  name="medical specialties"
                  url="/specialties"
                  :call-back-func="
                    (resp) => ({
                      text: resp.name,
                      value: resp.id,
                    })
                  "
                  rules="required"
                  required
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
                  v-model="signUpObject.phone_number"
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
  </div>
</template>
<script>
import { ValidationObserver } from 'vee-validate'
import AppInput from '@/components/AppInput'
import AppCheckbox from '@/components/AppCheckbox'
import AppSelect from '@/components/AppSelect'
import AppButton from '@/components/AppButton'

export default {
  components: {
    AppInput,
    AppCheckbox,
    AppButton,
    AppSelect,
    ValidationObserver,
  },
  data() {
    return {
      overlayIsVisible: false,
      visible1: false,
      visible2: false,
      year: new Date().getFullYear(),
      modalIsVisible: false,
      signUpIsVisible: false,
      signInIsVisible: false,
      confirmLoading: false,
      userObject: {},
      isSignInLoading: false,
      isSignUpLoading: false,
      isforgotLoading: false,
      mode: 'patient',
      signUpObject: {},
      forgotPasswordIsVisible: false,
      passwordObject: {},
    }
  },
  watch: {
    $route: {
      handler(to, from) {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        this.$refs.scroll.scrollTop = 0 // Because my scroll layer is not a body, set the scrollTop of the scroll layer to 0
      },
    },
  },
  methods: {
    async signInHandler() {
      const isValid = await this.$refs.obs1.validate()
      if (!isValid) {
        return
      }
      this.isSignInLoading = true
      try {
        const { data } = await this.$axios.$post('login', this.userObject)
        console.log(data)
        console.log(data.roles[0].name)
        localStorage.setItem('user', JSON.stringify(data))
        this.$router.push(`/admin/${data.roles[0].name}`)
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
      console.log(this.signUpObject)
      try {
        if (this.mode === 'practitioner') {
          if (this.signUpObject.type === 'DOCTOR') {
            const { response } = await this.$axios.$post(
              'doctors/signup',
              this.signUpObject
            )
            localStorage.setItem('user', JSON.stringify(response))
          } else {
            const partnerObj = {
              ...this.signUpObject,
              members: [
                {
                  first_name: this.signUpObject.first_name,
                  last_name: this.signUpObject.last_name,
                  email: this.signUpObject.email,
                  password: this.signUpObject.password,
                  password_confirmation:
                    this.signUpObject.password_confirmation,
                },
              ],
            }
            const { response } = await this.$axios.$post(
              'partners/signup',
              partnerObj
            )
            localStorage.setItem('user', JSON.stringify(response))
          }
        } else {
          const { response } = await this.$axios.$post(
            'signup',
            this.signUpObject
          )
          localStorage.setItem('user', JSON.stringify(response))
          this.$router.push(`/admin/patient`)
        }
        this.closeModal()
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
        this.showSignInModal()
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
    closeModal() {
      this.modalIsVisible = false
      this.signUpIsVisible = false
      this.signInIsVisible = false
      if (this.forgotPasswordIsVisible) {
        this.forgotPasswordIsVisible = false
        this.signInIsVisible = true
      }
    },
    showSignInModal() {
      this.modalIsVisible = true
      this.signInIsVisible = true
      this.signUpIsVisible = false
      this.forgotPasswordIsVisible = false
    },
    showSignUpModal(mode) {
      this.modalIsVisible = true
      this.signUpIsVisible = true
      this.signInIsVisible = false
      this.mode = mode
    },
    forgotPasswordIsVisibleHandler() {
      this.forgotPasswordIsVisible = true
      this.signInIsVisible = false
    },
    userHandler() {
      console.log('user is signed in')
      this.$router.replace('/admin/patient')
    },
    showOverlay() {
      this.overlayIsVisible = !this.overlayIsVisible
      this.visible2 = false
      this.visible1 = false
    },
    showSelectField(num) {
      if (num === 1) {
        this.visible1 = !this.visible1
        this.visible2 = false
      }
      if (num === 2) {
        this.visible2 = !this.visible2
        this.visible1 = false
      }
    },
    hideDropdown() {
      console.log('LOGGED')
      this.visible2 = false
      this.visible1 = false
    },
  },
}
</script>
<style lang="scss" scoped>
.signIn {
  padding: 0;
  @include breakpoint-up(large) {
    padding: 1.2rem;
  }
  h1 {
    @include breakpoint-up(large) {
      font-size: 2rem;
      line-height: 3rem;
    }
    @include breakpoint-up(xxlarge) {
      font-size: 2.25rem;
      line-height: 4rem;
    }
  }
}
</style>
