<template>
  <carousel
    :autoplay="true"
    :autoplay-hover-pause="true"
    :autoplay-timeout="5000"
    :pagination-enabled="true"
    :per-page="1"
    class="intro__carousel"
  >
    <slide>
      <h1>
        AFFORDABLE <br />
        PROFESSIONAL <br />
        ONLINE HEALTHCARE
      </h1>
      <p>
        Let's put a short but engaging sentence here to wet the appetite of the
        site visitors. Let's put a short but very engaging sentence here to wet
        the appetite of the site visitors. Let's put a short but very engaging
        sentence here to wet the appetite of the site visitors.
      </p>
      <br />
      <button class="button">Start Consultation</button>
    </slide>
    <slide>
      <h1>
        ALWAYS A HUMAN <br />
        CONNECTION: WEB, <br />
        PHONE AND VIDEO
      </h1>
      <p>
        Let's put a short but engaging sentence here to wet the appetite of the
        site visitors. Let's put a short but very engaging sentence here to wet
        the appetite of the site visitors. Let's put a short but very engaging
        sentence here to wet the appetite of the site visitors.
      </p>
      <br />
      <button class="button">Start Consultation</button>
    </slide>
    <slide>
      <h1>
        ONLINE DOCTOR <br />
        VISIT ANYTIME, <br />
        ANYWHERE!
      </h1>
      <p>
        Let's put a short but engaging sentence here to wet the appetite of the
        site visitors. Let's put a short but very engaging sentence here to wet
        the appetite of the site visitors. Let's put a short but very engaging
        sentence here to wet the appetite of the site visitors.
      </p>
      <br />
      <button class="button">Start Consultation</button>
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
}
</script>
<style lang="scss" scoped>
h1 {
  font-family: $Square721-Bold;
  text-shadow: 0px 16px 21px #00000029;
}
button {
  font-weight: bold;
}
</style>
