<template>
  <div>
    <section class="container flex flex-ai-c">
      <div class="intro__text">
        <AppIntroCarousel />
      </div>
      <div class="intro__image">
        <img
          src="@/assets/images/homepage/doctor-smiling.png"
          alt="doctor smiling"
        />
      </div>
    </section>
    <section class="service">
      <div
        class="container flex bg-white flex-ai-c flex-jc-sb service__heading"
      >
        <div class="column-3">
          <h5>Our Services</h5>
          <p>
            Our Integration of modern technology with primary healthcare gives
            all categories of people, however remote, round- the-clock access to
            affordable and quality healthcare services.
          </p>
        </div>
        <div class="service__carousel-container"><AppServiceCarousel /></div>
      </div>
      <div class="service__container container">
        <h3>Get 24/7 Online Services For You And Your Family</h3>
        <p>Sign up and connect with a doctor at your convenience</p>
        <br />
        <br />
        <button class="button">Get Started</button>
      </div>
    </section>
    <section class="container flex flex-jc-sa howitworks">
      <div class="column-3 howitworks__text">
        <h5>How It Works</h5>
        <ul>
          <li>
            Download the DrCallAwayTM App from the Google Play Store or iOS App
            Store and install on your mobile device.
          </li>
          <li>
            Register by stating your Full name, Age, Gender, Address, Medical
            Record (any underlying conditions), then select a plan.
          </li>
          <li>Pay for your chosen plan through online payment platforms.</li>
          <li>
            Call or Chat with the doctor. Medication will be prescribed as
            needed after your consultation.
          </li>
          <li>
            Pick up your prescription as well as run your diagnostic tests from
            our partners nearest to you.
          </li>
        </ul>
      </div>
      <div class="column-3 howitworks__image">
        <img src="@/assets/images/homepage/phone.png" alt="phone" />
      </div>
    </section>
    <section class="container ailment">
      <div>
        <h5 class="tx-c">Common Ailments Treated</h5>
        <p class="tx-c">
          Sign up and connect with a doctor at your convenience
        </p>
        <br />
        <div class="ailment__list flex flex-jc-c">
          <ul class="column-3">
            <li>Allergic Rhinitis</li>
            <li>Arthritis</li>
            <li>Asthma</li>
            <li>Respiratory tract infections</li>
            <li>Urinary tract infections</li>
            <li>ENT infections</li>
          </ul>
          <ul class="column-3">
            <li>Hypertension</li>
            <li>Malaria</li>
            <li>Common Cold And Flu</li>
            <li>Skin Conditions</li>
            <li>Eye Irritations And Infections</li>
            <li>Diabetes</li>
          </ul>
          <ul class="column-3">
            <li>Anxiety &amp; Depression</li>
            <li>Headache</li>
            <li>GIT Related diseases</li>
            <li>Back pain</li>
            <li>Sexual health</li>
            <li>Stress &amp; trauma</li>
          </ul>
        </div>
      </div>
    </section>
    <section class="container flex flex-ai-c last-section">
      <div class="column-6 img-container">
        <img src="@/assets/images/homepage/boy-patient.png" alt="boy-patient" />
      </div>
      <div class="column-6 text-container">
        <h5>Designed To Be Rewarding For Patients</h5>
        <ul>
          <li>Get Medical Care for Non Emergency Conditions</li>
          <li>24/7 Access to Licensed doctors</li>
          <li>Connect by Phone,Web or App from Anywhere</li>
          <li>Online Real-time Video Chat</li>
        </ul>
        <br />
        <button class="button">Start Your Virtual Visit</button>
      </div>
    </section>
  </div>
</template>
<script>
import AppIntroCarousel from '@/components/homepage/AppIntroCarousel.vue'
import AppServiceCarousel from '@/components/homepage/AppServiceCarousel.vue'

export default {
  components: {
    AppIntroCarousel,
    AppServiceCarousel,
  },
}
</script>
<style lang="scss" scoped>
.intro {
  &__image {
    width: 100%;
    order: 1;
    img {
      width: 100%;
    }
    @include breakpoint-up(large) {
      width: 60%;
    }
    @include breakpoint-up(xxlarge) {
      width: 50%;
    }
  }
  &__text {
    order: 2;
    width: 100%;
    @include breakpoint-up(large) {
      width: 40%;
    }
  }
}
.service {
  position: relative;
  padding-bottom: 5rem;
  // background-image: url('@/assets/images/homepage/services-bg.svg');
  // background-repeat: no-repeat;
  // background-position: -27rem -4.25rem;
  &::before {
    // content: '';
    position: absolute;
    bottom: -6px;
    width: 100%;
    height: 100%;
    z-index: -2;
    background-image: url('@/assets/images/homepage/services-bg.svg');
    background-repeat: no-repeat;
    @include breakpoint-up(large) {
      bottom: -1.5rem;
      left: -18rem;
    }
    @include breakpoint-up(xxlarge) {
      bottom: -1.5rem;
      left: -18rem;
      padding-bottom: 7rem;
    }
  }

  &__heading {
    padding-bottom: 3rem;
    margin-top: 4px;
    @include breakpoint-up(large) {
      padding-bottom: 5rem;
    }
    h5 {
      color: $purple;
    }
  }
  &__carousel-container {
    width: 100%;
    @include breakpoint-up(large) {
      width: 60%;
    }
  }
  &__container {
    padding: 3rem 1.5rem;
    text-align: center;
    background-color: rgba(61, 12, 60, 0.85);
    background-blend-mode: darken;
    background-image: url('@/assets/images/homepage/family.png');
    color: $white !important;
    @include breakpoint-up(large) {
      padding: 4rem 1.5rem;
    }
    @include breakpoint-up(xxlarge) {
      padding: 5rem 1.5rem;
    }
    button {
      background-color: $white;
      color: $purple !important;
      font-weight: bold;
    }
    h3 {
      color: $white;
      margin-top: 0;
    }
    p {
      margin: 0;
      font-weight: 400;
    }
  }
}
.ailment {
  position: relative;
  padding-top: 3rem;
  padding-bottom: 5rem;
  background: $dark-purple;
  color: $white;
  &::before {
    // content: '';
    position: absolute;
    top: -31rem;
    left: 0;
    // transform: rotate(64deg);
    width: 100%;
    height: 100%;
    background-image: url('@/assets/images/homepage/services-bg.svg');
    background-repeat: no-repeat;
    z-index: -2;
  }
  h5 {
    color: $white;
    margin: 0;
  }
  &__list {
    ul {
      list-style-type: none;
      margin: 0;
      li {
        position: relative;
        margin-bottom: 0.8rem;
        &::before {
          content: '';
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: -40px;
          width: 0.875rem;
          height: 0.875rem;
          background: $white;
          border-radius: 100%;
        }
      }
    }
  }
}
.howitworks {
  padding-bottom: 3rem;
  &__image {
    padding: 0 3rem;
    @include breakpoint-up(xxlarge) {
      padding: 0 5rem;
    }
    img {
      width: 100%;
    }
  }
  &__text {
    h5 {
      color: $purple;
    }
    ul {
      list-style-type: none;
      @include breakpoint-up(large) {
        padding-left: 4rem;
      }

      li {
        margin-bottom: 2rem;
        position: relative;
        &::before {
          content: '';
          position: absolute;
          left: -45px;
          border-radius: 100%;
          background-color: $purple;
          color: $white;
          padding: 0.1rem 0.6rem;
          font-weight: bold;
          @include breakpoint-up(large) {
            padding: 0.1rem 0.75rem;
            left: -4rem;
          }
          @include breakpoint-up(xxlarge) {
            padding: 0.1rem 0.9rem;
          }
        }
        // &:not(:last-child) {
        //   &::after {
        //     content: '';
        //     position: absolute;
        //     top: 24px;
        //     left: -45px;
        //     width: 1px;
        //     height: 6rem;
        //     background: $purple;
        //   }
        // }
        &:first-child {
          &::before {
            content: '1';
          }
        }
        &:nth-child(2) {
          &::before {
            content: '2';
          }
        }
        &:nth-child(3) {
          &::before {
            content: '3';
          }
        }
        &:nth-child(4) {
          &::before {
            content: '4';
          }
        }
        &:last-child {
          &::before {
            content: '5';
          }
        }
      }
    }
  }
}
.last-section {
  padding-top: 3rem;
  position: relative;
  &::before {
    @include breakpoint-up(large) {
      content: '';
      position: absolute;
      top: -28%;
      left: -22%;
      opacity: 0.5;
      width: 100%;
      min-height: 150%;
      background-image: url('@/assets/images/homepage/services-bg.svg');
      background-repeat: no-repeat;
      z-index: -2;
    }
  }
  @include breakpoint-up(large) {
    padding-top: 6rem;
  }
  .img-container {
    margin-bottom: 3rem;
    @include breakpoint-up(large) {
      padding-right: 3rem;
    }
    img {
      width: 100%;
    }
  }
  .text-container {
    @include breakpoint-up(large) {
      padding-left: 3rem;
    }
    h5 {
      margin-top: 0;
      color: $medium-purple;
    }
    ul {
      list-style-type: none;
      margin: 0;
      li {
        position: relative;
        margin-bottom: 0.8rem;
        color: $medium-purple;
        font-weight: bold;
        font-size: 14px;
        &::before {
          content: '';
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: -40px;
          width: 0.75rem;
          height: 0.75rem;
          background: $medium-purple;
          border-radius: 100%;
        }
      }
    }
  }
}
</style>
