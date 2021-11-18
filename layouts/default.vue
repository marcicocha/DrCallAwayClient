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
          <nuxt-link to="contact-us"
            ><span class="m-lr" @click="hideDropdown"
              >Contact Us</span
            ></nuxt-link
          >
          <button
            to="contact"
            class="button header__button"
            @click="signInHandler"
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
          <div class="header__links-anchor-container" @click="showOverlay">
            <nuxt-link to="contact-us"><span>Contact Us</span></nuxt-link>
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
            @click="signInHandler"
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
              <p style="margin-top: 1rem">
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
    <AppManageSignInUp
      :mode="mode"
      :modal-is-visible="modalIsVisible"
      :sign-up-is-visible="signUpIsVisible"
      :sign-in-is-visible="signInIsVisible"
      @closeModal="closeModal"
      @showSignInModal="showSignInModal"
      @showSignUpModal="showSignUpModal"
      @closeModalSignInHandler="closeModalSignInHandler"
    />
  </div>
</template>
<script>
import AppManageSignInUp from '@/components/AppManageSignInUp'
export default {
  components: {
    AppManageSignInUp,
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
      mode: 'patient',
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
    closeModal() {
      this.modalIsVisible = false
      this.signUpIsVisible = false
      this.signInIsVisible = false
    },
    closeModalSignInHandler() {
      this.signInIsVisible = false
    },
    signInHandler() {
      const user = JSON.parse(localStorage.getItem('user'))
      if (user) {
        this.$router.push(`/admin/${user.roles[0].name}`)
        return
      }
      this.showSignInModal()
    },
    showSignInModal() {
      this.modalIsVisible = true
      this.signInIsVisible = true
      this.signUpIsVisible = false
    },
    showSignUpModal(mode) {
      this.modalIsVisible = true
      this.signUpIsVisible = true
      this.signInIsVisible = false
      this.mode = mode
    },
    userHandler() {
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
