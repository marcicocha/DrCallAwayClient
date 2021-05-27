<template>
  <div>
    <h6>Effect</h6>
    <p>
      These Terms and Conditions shall apply to the Services. When you access or
      accept the Services, this shall in any event constitute your unqualified
      acceptance of these Terms and Conditions.
    </p>
    <p>
      We may periodically update or change the Terms and Conditions of this Site
      without giving you prior notice. You should check them regularly, as your
      continued use of our Site means that you accept any updated or revised
      terms.
    </p>
    <br />
    <div class="flex flex-jc-sb navigation">
      <a @click="$emit('changePageHandler', 'status')"
        ><h6>&#60;&#60;&#60; Status</h6></a
      >
      <a @click="$emit('changePageHandler', 'ourWebsite')"
        ><h6>Use of Our Website &#62;&#62;&#62;</h6></a
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
