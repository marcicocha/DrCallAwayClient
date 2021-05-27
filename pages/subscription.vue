<template>
  <div class="subscription">
    <div class="title">
      <h1>Subscriptions</h1>
    </div>
    <div class="container">
      <p class="sub-title">DrCallAwayTM plans are in two tiers.</p>
      <div class="flex flex-jc-sb">
        <AppCard
          v-for="(suscription, i) in suscriptionList"
          :key="i"
          class="card"
        >
          <div>
            <div class="t-c">
              <img :src="getImgHandler(suscription.imgSrc)" alt="icons" />
              <h5>{{ suscription.title }}</h5>
            </div>
            <ul>
              <li v-for="(feature, m) in suscription.features" :key="m">
                {{ feature }}
              </li>
            </ul>
            <br />
            <button class="button">Subscribe Now</button>
          </div>
        </AppCard>
      </div>
    </div>
  </div>
</template>
<script>
import AppCard from '@/components/AppCard'

export default {
  components: { AppCard },
  data() {
    return {
      suscriptionList: [
        {
          title: 'Standard',
          description:
            'Download the DrCallAwayTM from the Google Play Store or iOS App Store unto your smartphone or device',
          imgSrc: 'user.png',
          features: [
            'Unlimited video and audio consultations with a doctor and get prescriptions',
            'Enjoy discounts from our partners',
            'Get hospital referrals and book appointments',
            'Get notifications bi-annually to keep track of your key health indicators; Blood Pressure, Blood sugar, Cholesterol, etc',
          ],
        },
        {
          title: 'Premium',
          description:
            'Register by stating your full name, age, gender, address, medical record (any underlying conditions), then select your plan.',
          imgSrc: 'crown.png',
          features: [
            'Unlimited video and audio consultations with a doctor and get prescriptions',
            'Enjoy 50% higher discounts from our partners',
            'Get Drug subsidy of ₦2000/semi-annually at partner pharmacies (non-cummulative)',
            'Get hospital referrals and book appointments',
            'Get notifications bi-annually to keep track of your key health indicators; Blood Pressure, Blood sugar, Blood Cholesterol, BMI, etc',
          ],
        },
      ],
    }
  },
  methods: {
    getImgHandler(pic) {
      return require('~/assets/images/subscription/icons/' + pic)
    },
  },
}
</script>
<style lang="scss" scoped>
.subscription {
  margin-bottom: 4.125rem !important;
}
.title {
  padding: 6rem 0;
  text-align: center;
  background-color: rgba(61, 12, 60, 0.85);
  background-size: cover;
  background-repeat: no-repeat;
  background-blend-mode: darken;
  background-image: url('@/assets/images/subscription/background.png');
  h1 {
    color: $white !important;
  }
}
.sub-title {
  text-align: center;
  margin: 2rem 0;
  @include breakpoint-up(large) {
    margin: 3rem 0;
  }
}
.card {
  width: 100%;
  position: relative;
  margin-bottom: 2rem;
  @include breakpoint-up(large) {
    width: 47%;
  }
  img {
    width: 4rem;
    height: 4rem;
  }
  h5 {
    margin-top: 0;
  }
  ul {
    list-style-type: none;
    margin: 0;
    margin-bottom: 3rem;
    li {
      position: relative;
      margin-bottom: 0.8rem;
      &::before {
        content: '';
        position: absolute;
        top: 0.5rem;
        // transform: translateY(-50%);
        left: -40px;
        width: 0.5rem;
        height: 0.5rem;
        background: $medium-purple;
        border-radius: 100%;
        @include breakpoint-up(large) {
          width: 0.6rem;
          height: 0.6rem;
          top: 0.6rem;
        }
      }
    }
  }
  button {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
