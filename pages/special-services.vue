<template>
  <div class="container special">
    <h2>Our Special Services</h2>
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
        <button class="button" @click="signInHandler">Explore More</button>
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
      modalIsVisible: false,
      signUpIsVisible: false,
      signInIsVisible: false,
      mode: 'patient',
      keyServicesList: [
        {
          title: 'Apply for Medical loans',
          description:
            'Don’t miss out on essential medical services due to temporary lack of resources. Access loans for medical expenses through our finance partners.',
          imgSrc: 'pharmacy.png',
        },
        {
          title: 'Book for your Routine Medical Screening',
          description:
            'Knowing your numbers is as important as talking to your doctor. This entails getting tested in a reliable and trusted center. Count on us to point you in the right direction. Tests results will be forwarded online to your GP and uploaded to your medical records on our system.',
          imgSrc: 'laboratory.png',
        },
        {
          title: 'DrCallAway<sup>TM</sup> Book An Ambulance',
          description:
            'Has a loved one suddenly fallen sick or does someone need to get to the hospital urgently? No need to worry, DrCallAway<sup>TM</sup> is your trusted link, 24/7 at your service.',
          imgSrc: 'ambulance.png',
        },
      ],
    }
  },
  methods: {
    getImgHandler(pic) {
      return require('~/assets/images/special-service/' + pic)
    },
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
        console.log(user, 'USER')
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
  },
}
</script>
<style lang="scss" scoped>
.special {
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
