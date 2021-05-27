<template>
  <div>
    <h6>Data Confidentiality Right</h6>
    <p>
      Your information is regarded as confidential and will not be divulged to
      any third party except under legal and/or regulatory conditions. Except as
      otherwise stated in this Privacy Policy, we do not sell, trade, rent or
      otherwise market your personal information to third parties without your
      consent. We may however share your personal information with Vendors who
      are performing services for Savon Nettoyage.
    </p>
    <br />
    <div class="flex flex-jc-sb navigation">
      <a @click="$emit('changePageHandler', 'periodicSurvey')"
        ><h6>&#60;&#60;&#60; Periodic Survey</h6></a
      >
      <a @click="$emit('changePageHandler', 'security')"
        ><h6>Security &#62;&#62;&#62;</h6></a
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
