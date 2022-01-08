<template>
  <div
    class="flex flex-jc-sb flex-ai-c dashboard-card"
    :style="{ background: color }"
    @click="$emit('click')"
  >
    <div class="img-container">
      <img :src="getImgHandler(cardObj.imgSrc)" alt="icon" />
    </div>
    <div class="t-r">
      <p>{{ cardObj.firstText }}</p>
      <h4>{{ cardObj.secondText }}</h4>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AppDashboardCard',
  props: {
    cardObj: {
      type: Object,
      default: () => ({}),
    },
    color: {
      type: String,
      default: '',
    },
  },
  methods: {
    getImgHandler(pic) {
      return require('~/assets/images/' + pic)
    },
  },
}
</script>
<style lang="scss">
.dashboard-card {
  padding: 1.5rem;
  color: white;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    font-size: 16px;
    margin-bottom: 0;
    @include breakpoint-up(large) {
      font-size: 18px;
    }
  }
  h4 {
    font-size: 20px;
    color: white;
    font-weight: 400;
    margin-bottom: 0;
    font-family: 'Lato', sans-serif;
    @include breakpoint-up(large) {
      font-size: 24px;
    }
  }
}
.img-container {
  img {
    width: 70px;
    height: 70px;
  }
}
</style>
