<template>
  <carousel
    :autoplay="true"
    :autoplay-hover-pause="true"
    :autoplay-timeout="5000"
    :pagination-enabled="false"
    :per-page="1"
    :loop="true"
  >
    <slide ref="slide">
      <img src="@/assets/images/homepage/phone/phone1.png" alt="phone" />
    </slide>
    <slide>
      <img src="@/assets/images/homepage/phone/phone1.png" alt="phone"
    /></slide>
    <slide>
      <img src="@/assets/images/homepage/phone/phone1.png" alt="phone"
    /></slide>
    <slide>
      <img src="@/assets/images/homepage/phone/phone1.png" alt="phone"
    /></slide>
    <slide>
      <img src="@/assets/images/homepage/phone/phone1.png" alt="phone"
    /></slide>
  </carousel>
</template>
<script>
import { Carousel, Slide } from 'vue-carousel'

export default {
  name: 'AppHowItWorksCarousel',
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
img {
  width: 100%;
}
</style>
