<template>
  <div>
    <h6>Security</h6>
    <p>
      Savon Nettoyage makes every attempt to secure your personal information
      from unauthorized access, use or disclosure. However Savon Nettoyage does
      not guarantee that your information will not be accessed, disclosed,
      altered or destroyed by breach of firewalls or secure server software or
      breach not within its control. By accessing Savon Nettoyage Website, you
      acknowledge, understand and agree to assume these risks and not hold Savon
      Nettoyage liable in any form.
    </p>
    <br />
    <div class="flex flex-jc-sb navigation">
      <a @click="$emit('changePageHandler', 'dataRight')"
        ><h6>&#60;&#60;&#60; Data Confidentiality Rights</h6></a
      >
      <a @click="$emit('changePageHandler', 'rightToOptOut')"
        ><h6>Right To Opt Out &#62;&#62;&#62;</h6></a
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
