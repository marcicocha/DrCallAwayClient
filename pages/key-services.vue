<template>
  <div class="container key">
    <h2>Our Key Services</h2>
    <br />
    <AppCard
      v-for="(service, i) in keyServicesList"
      :key="i"
      class="flex flex-jc-sb card"
    >
      <div class="img-container">
        <img :src="getImgHandler(service.imgSrc)" />
      </div>
      <div class="text-container">
        <h4 v-html="service.title"></h4>
        <p v-if="service.description" v-html="service.description"></p>
        <ul v-if="service.features">
          <li v-for="(feature, m) in service.features" :key="m">
            <span v-html="feature"></span>
          </li>
        </ul>
        <button class="button">Explore More</button>
      </div>
    </AppCard>
  </div>
</template>
<script>
import AppCard from '@/components/AppCard'
export default {
  components: { AppCard },
  data() {
    return {
      keyServicesList: [
        {
          title: `DrCallAway<sup>TM</sup> Consultation`,
          features: [
            'Consult with a qualified medical doctor 24/7 from the comfort of your home or office via limitless audio and video calls.',
            'Avoid long queues and delays in the hospital',
            'Get prescriptions',
          ],
          imgSrc: 'img1.png',
        },
        {
          title: 'DrCallAway<sup>TM</sup> Book An Appointment',
          features: [
            'DrCallAway<sup>TM</sup> has a wide network of renowned specialists in Nigeria and around the world. We can refer you to see a specialist closest to you. Click to book an appointment.',
          ],
          imgSrc: 'img2.png',
        },
        {
          title: 'DrCallAway<sup>TM</sup> Special Ailments',
          description:
            'People living with chronic ailments require support and management to maintain a good quality of life. Let DrCallAway<sup>TM</sup> link you to a specialist who has the expertise and experience to care for you and render the necessary counselling and guidance.',
          features: [
            'Specialists in management of HIV/TB, Diabetes, Hypertension, Sickle cell, Mental health.',
          ],
          imgSrc: 'img3.png',
        },
        {
          title: 'DrCallAway<sup>TM</sup> Wellness And Nutrition',
          description:
            'No more hassles to know your overall key numbers. We are here to help you keep track of your health status. Talk to a nutritionist, fitness coach or do your annual medical screenings. You are just a click away!',
          imgSrc: 'img4.png',
          features: [],
        },
        {
          title: 'DrCallAway<sup>TM</sup> Home Care',
          description:
            'Do you have aged parents , relatives or people living with disabilities who require special homecare? DrCallAway<sup>TM</sup> will make that process seamless by linking you to professional health care-givers depending on your need.',
          imgSrc: 'img5.png',
          features: [],
        },
      ],
    }
  },
  methods: {
    getImgHandler(pic) {
      return require('~/assets/images/key-service/' + pic)
    },
  },
}
</script>
<style lang="scss" scoped>
.key {
  margin-bottom: 4.125rem !important;
}
h2 {
  text-align: center;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: 50%;
    transform: translateX(-50%);
    background: $purple;
    height: 2px;
    width: 5rem;
  }
}
h4 {
  @include breakpoint-up(large) {
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
}
.img-container {
  width: 100%;
  @include breakpoint-up(large) {
    width: 33%;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.text-container {
  width: 100%;
  @include breakpoint-up(large) {
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    button {
      width: fit-content;
    }
  }
}
.card {
  margin-bottom: 2rem;
  min-height: 330px;
  &:nth-child(even) {
    .img-container {
      order: 2;
    }
    .text-container {
      order: 1;
    }
  }
}
ul {
  list-style-type: none;
  margin: 0;
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
  margin-top: 1.5rem;
  @include breakpoint-up(large) {
    margin-top: 3rem;
  }
}
</style>
