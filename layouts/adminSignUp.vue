<template>
  <div class="wrapper">
    <div class="wrapper-container">
      <Nuxt />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.wrapper {
  height: 100vh;
  width: 100%;
  background: $dark-purple;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wrapper-container {
  background: $white;
  padding: 0 2rem;
  @include breakpoint-up(large) {
    width: 40%;
    margin: 0 auto;
    padding: 0 5rem;
  }
}
</style>
