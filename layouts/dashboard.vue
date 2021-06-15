<template>
  <div class="wrapper">
    <div class="wrapper_container">
      <AppSideBar class="sidebar" :minified="minified" />
      <section
        :class="{
          body: true,
          'body__full-width': !minified,
          'body__minimized-width': minified,
        }"
      >
        <AppHeader :minified="minified" @menuHandler="menuHandler" />
        <br />
        <br />
        <Nuxt />
      </section>
    </div>
  </div>
</template>
<script>
import AppSideBar from '@/components/AppSideBar'
import AppHeader from '@/components/AppHeader'
export default {
  components: {
    AppSideBar,
    AppHeader,
  },
  data() {
    return { minified: false }
  },
  methods: {
    menuHandler(bool) {
      this.minified = bool
    },
  },
}
</script>
<style lang="scss" scoped>
.wrapper {
  // position: relative;
  // width: auto;
  // flex-grow: 1;
  // margin: 0 auto;
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .wrapper_container {
    display: flex;
    width: 100%;
    .body {
      width: 100%;
      display: flex;
      overflow: auto;
      padding: 0 40px;
      padding-bottom: 2rem;
      flex-direction: column;
      transition: all 0.8s cubic-bezier(0.55, 0, 0.1, 1) 0.15s;
      overflow-y: scroll;
      background: #f7f8fa;
      padding-right: 30px;
      &__full-width {
        padding-left: 260px;
        @include breakpoint-up(xxlarge) {
          padding-left: 330px;
        }
      }
      &__minimized-width {
        padding-left: 110px;
        @include breakpoint-up(xxlarge) {
          padding-left: 150px;
        }
      }
    }
  }
}
</style>
