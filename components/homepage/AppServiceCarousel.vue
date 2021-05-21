<template>
  <carousel
    :pagination-enabled="false"
    :per-page-custom="[
      [640, 2],
      [1024, 3],
    ]"
    class="service__carousel"
    :navigation-enabled="true"
    :navigation-next-label="nextLabel"
    :navigation-prev-label="prevLabel"
    :scrollPerPage="true"
  >
    <slide v-for="(item, i) in serviceList" :key="i" class="slide">
      <div class="slide__container">
        <img :src="getImgHandler(item.imgSrc)" />
        <div class="text">
          <p>{{ item.description }}</p>
        </div>
      </div>
    </slide>
  </carousel>
</template>
<script>
import { Carousel, Slide } from 'vue-carousel'

export default {
  name: 'AppServiceCarousel',
  components: {
    Carousel,
    Slide,
  },
  data() {
    return {
      nextLabel: "<i class='fas fa-arrow-right'></i>",
      prevLabel: "<i class='fas fa-arrow-left'></i>",
      serviceList: [
        {
          description: 'Consultations',
          imgSrc: 'img1.png',
        },
        {
          description: 'Book an Appointment',
          imgSrc: 'img2.png',
        },
        {
          description: 'Special Ailments',
          imgSrc: 'img3.png',
        },
      ],
    }
  },
  methods: {
    getImgHandler(pic) {
      return require('~/assets/images/homepage/' + pic)
    },
  },
}
</script>
<style lang="scss" scoped>
h1 {
  font-family: $square721;
  text-shadow: 0px 16px 21px #00000029;
}
.slide {
  padding-right: 0.8rem;
  border-radius: 10px;
  flex-shrink: 0;
  &__container {
    position: relative;
    width: 100%;
    height: 100%;
    .text {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      background: rgba(0, 0, 0, 0.75);
      text-align: center;
      border-radius: 10px;
      p {
        margin: 0;
        font-family: $square721;
        font-weight: bold;
        color: $white;
        position: absolute;
        top: 50%;
        left: 50%;
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
      }
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 10px;
    }
  }
}
</style>
