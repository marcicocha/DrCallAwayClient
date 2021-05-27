<template>
  <div class="work_container">
    <div class="title">
      <h1>How It Works</h1>
    </div>
    <div class="container">
      <p class="sub-title">Follow these Five quick steps.</p>
      <div class="flex flex-jc-c flex-wrap">
        <AppCard v-for="(step, i) in stepList" :key="i" class="card">
          <div class="card__title">
            <img :src="getImgHandler(step.imgSrc)" alt="icons" />
            <h5>{{ `Step ${i}` }}</h5>
          </div>
          <p>{{ step.description }}</p>
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
      stepList: [
        {
          description:
            'Download the DrCallAwayTM from the Google Play Store or iOS App Store unto your smartphone or device',
          imgSrc: 'download.png',
        },
        {
          description:
            'Register by stating your full name, age, gender, address, medical record (any underlying conditions), then select your plan.',
          imgSrc: 'tablet.png',
        },
        {
          description:
            'Pay for your chosen plan online through Quickteller, Paga, Kudi, Opay or other payment platforms. You will receive a unique identification (ID) number.',
          imgSrc: 'card.png',
        },
        {
          description:
            'Call or chat with the doctor. Medication will be prescribed as needed after your consultation.',
          imgSrc: 'phone.png',
        },
        {
          description:
            'Pick up your prescription from our partner pharmacy nearest to you.',
          imgSrc: 'medication.png',
        },
      ],
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
  background-image: url('@/assets/images/how-it-works/background.png');
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
  margin-bottom: 2rem;
  &__title {
    display: flex;
    img {
      width: 2rem;
      height: 2rem;
    }
    h5 {
      margin: 0;
      margin-left: 2rem;
    }
  }
  @include breakpoint-up(large) {
    width: 31%;
    &:nth-child(2) {
      margin: 0 2rem;
      margin-bottom: 2rem;
    }
    &:last-child {
      margin-left: 2rem;
    }
  }
}
</style>
