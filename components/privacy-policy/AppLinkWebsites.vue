<template>
  <div>
    <h6>Link To Other Website</h6>
    <p>
      As part of our services, we may provide links to or compatibility with
      other websites or applications. You agree that we are not responsible for
      the privacy policies of these websites. On the other hand, where you
      access our services through another website or application, the privacy
      policy of the other website or application will apply to your access or
      use of that site.
    </p>
    <br />
    <div class="flex flex-jc-sb navigation">
      <a @click="$emit('changePageHandler', 'rightToOptOut')"
        ><h6>&#60;&#60;&#60; Right to Opt Out</h6></a
      >
      <a @click="$emit('changePageHandler', 'governingLaw')"
        ><h6>Governing Law &#62;&#62;&#62;</h6></a
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
