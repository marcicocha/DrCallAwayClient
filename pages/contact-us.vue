<template>
  <div class="work_container">
    <div class="title">
      <h1>Contact Us</h1>
    </div>
    <div class="container">
      <div class="contact_container flex">
        <div class="contact_container-info">
          <h5>Contact Us</h5>
          <ul>
            <li>
              <span><img src="@/assets/images/contact/marker.png" /></span>
              <span
                >Plot 1437 Sanusi Fafunwa Street, Victoria Island, Lagos
              </span>
            </li>
            <li>
              <span><img src="@/assets/images/contact/phone.png" /></span>
              <span>+23490511111111</span>
            </li>
            <li>
              <span><img src="@/assets/images/contact/mail.png" /></span>
              <span>info@dracallaway.ng</span>
            </li>
            <li>
              <span><img src="@/assets/images/contact/map.png" /></span>
              <span>www.drcallaway.ng</span>
            </li>
          </ul>
          <div class="socials">
            <div>
              <img src="@/assets/images/contact/facebook.png" />
            </div>
            <div>
              <img src="@/assets/images/contact/instagram.png" />
            </div>
            <div>
              <img src="@/assets/images/contact/twitter.png" />
            </div>
            <div>
              <img src="@/assets/images/contact/linkedin.png" />
            </div>
          </div>
        </div>
        <div class="contact_container-form">
          <h5>Get In Touch</h5>
          <p>Feel free to drop us a message!</p>
          <a-form>
            <AppInput v-model="contactObj.email" placeholder="Email Address" />
            <AppInput
              v-model="contactObj.phoneNumber"
              placeholder="Phone Number"
            />
            <AppTextArea v-model="contactObj.message" placeholder="Message" />
          </a-form>
          <br />
          <AppButton class="contact-btn" :block="false" size="default"
            >Submit</AppButton
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AppButton from '@/components/AppButton'
import AppInput from '@/components/AppInput'
import AppTextArea from '@/components/AppTextArea'

export default {
  components: {
    AppButton,
    AppInput,
    AppTextArea,
  },
  data() {
    return {
      contactObj: {},
    }
  },
  methods: {
    getImgHandler(pic) {
      return require('~/assets/images/how-it-works/icons/' + pic)
    },
  },
}
</script>
<style lang="scss" scoped>
.work_container {
  margin-bottom: 4.125rem !important;
}
.title {
  padding: 6rem 0;
  text-align: center;
  background-color: rgba(61, 12, 60, 0.85);
  background-size: cover;
  background-repeat: no-repeat;
  background-blend-mode: darken;
  background-image: url('@/assets/images/contact/contact-background.png');
  h1 {
    color: $white !important;
  }
}
.contact_container {
  margin-top: 2rem;
  @include breakpoint-up(large) {
    margin-left: 2rem;
    padding: 1.5rem;
    background: #eff3f9 0% 0% no-repeat padding-box;
    box-shadow: 0px 9px 12px #00000029;
  }
  ul {
    list-style-type: none;
    padding-left: 0;
    li {
      display: flex;
      margin-bottom: 1rem;
      font-size: 0.875rem;
      span {
        display: block;
        &:first-child {
          width: 1.2rem;
          height: 1.2rem;
          margin-right: 1rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  h5 {
    color: #92278f;
    text-shadow: 0px 5px 6px #00000029;
  }
  &-info {
    background: #eedded 0% 0% no-repeat padding-box;
    box-shadow: 0px 6px 9px #00000029;
    padding: 0.5rem 1rem;
    h5 {
      margin-top: 0.5rem;
    }
    @include breakpoint-up(large) {
      width: 40%;
      margin-left: -4rem;
    }
  }
  &-form {
    @include breakpoint-up(large) {
      width: 60%;
      padding-left: 4rem;
    }
  }
  .contact-btn {
    background-color: $purple !important;
    padding: 0 3rem !important;
    font-size: 14px !important;
  }
  .socials {
    display: flex;
    margin: 2rem 0;
    div {
      background: $medium-light;
      border-radius: 50%;
      padding: 0.25rem 0.5rem;
      margin-right: 0.75rem;
      img {
        width: 0.75rem;
        height: 0.75rem;
      }
    }
  }
}
</style>
