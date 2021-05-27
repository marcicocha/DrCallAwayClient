<template>
  <div>
    <h6>Governing Laws</h6>
    <p>
      This Privacy Policy shall be governed by and construed in all respects in
      accordance with Nigerian law and shall be subject to the jurisdiction of
      Nigerian court.
    </p>
    <br />
    <div class="flex flex-jc-sb navigation">
      <a @click="$emit('changePageHandler', 'linkWebsites')"
        ><h6>&#60;&#60;&#60; Link to Other Websites</h6></a
      >
      <a @click="$emit('changePageHandler', 'cookies')"
        ><h6>Cookies &#62;&#62;&#62;</h6></a
      >
    </div>
  </div>
</template>
<style lang="scss" scoped>
h6 {
  color: $purple;
}
a {
  h6 {
    text-shadow: 0px 16px 21px #00000029;
  }
}
</style>
