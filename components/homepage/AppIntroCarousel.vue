<template>
  <carousel
    :autoplay="true"
    :autoplay-hover-pause="true"
    :autoplay-timeout="5000"
    :pagination-enabled="true"
    :per-page="1"
    :loop="true"
    class="intro__carousel"
  >
    <slide ref="slide" class="flex flex-ai-c">
      <div class="intro__text fade-in">
        <h1>
          AFFORDABLE <br />
          PROFESSIONAL <br />
          ONLINE HEALTHCARE
        </h1>
        <p>
          Welcome to DrCallAway, home of quality telemedicine services. Our
          Medical team is available 24/7 to assist you and your family from the
          comfort of your home, office or anywhere you are.
        </p>
        <br />
        <button class="button" @click="$emit('signInHandler')">
          Start Consultation
        </button>
      </div>
      <div class="intro__image">
        <img
          src="@/assets/images/homepage/slide/slide1.png"
          alt="doctor smiling"
        />
      </div>
    </slide>
    <slide class="flex flex-ai-c">
      <div class="intro__text fade-in">
        <h1>
          ALWAYS A HUMAN <br />
          CONNECTION: WEB, <br />
          PHONE AND VIDEO
        </h1>
        <p>
          Our telehealth solutions make it easy for people to access best
          in-class care whenever and wherever, while driving down overall
          healthcare costs.
        </p>
        <br />
        <button class="button" @click="$emit('signInHandler')">
          Start Consultation
        </button>
      </div>
      <div class="intro__image">
        <img
          src="@/assets/images/homepage/slide/slide2.png"
          alt="doctor smiling"
        />
      </div>
    </slide>
    <slide class="flex flex-ai-c">
      <div class="intro__text fade-in">
        <h1>
          ONLINE DOCTOR <br />
          VISIT ANYTIME, <br />
          ANYWHERE!
        </h1>
        <p>
          Let's fasten and brace ourselves to win the battle against
          coronavirus. The NCDC recommends and encourages using telehealth, as
          virtual treatment can help to limit exposure and spread of the virus.
        </p>
        <br />
        <button class="button" @click="$emit('signInHandler')">
          Start Consultation
        </button>
      </div>
      <div class="intro__image">
        <img
          src="@/assets/images/homepage/slide/slide3.png"
          alt="doctor smiling"
        />
      </div>
    </slide>
  </carousel>
</template>
<script>
import { Carousel, Slide } from 'vue-carousel'

export default {
  name: 'AppIntroCarousel',
  components: {
    Carousel,
    Slide,
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.slide.$el.classList.add('VueCarousel-slide-active')
    })
  },
}
</script>
<style lang="scss" scoped>
h1 {
  font-family: $BoldFont;
  text-shadow: 0px 16px 21px #00000029;
}
p {
  text-align: justify;
}
button {
  font-weight: bold;
}
.intro {
  &__carousel {
    position: relative;
    @include breakpoint-up(large) {
      .VueCarousel-dot-container {
        margin-top: 0px !important;
      }
    }
  }
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
</style>
