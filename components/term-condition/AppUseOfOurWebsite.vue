<template>
  <div>
    <h6>Use of Our Website</h6>
    <p>
      You are welcome to browse or use our Site for your own personal and
      information purposes only. No other use is permitted without our prior
      written consent. The unauthorised use, copying, reproduction, variation,
      modification or distribution of the content of this Site, the uploading of
      any unlawful or damaging information or viral software, or the creation of
      any links to our website from any other site whatsoever, is strictly
      prohibited.
    </p>
    <p>
      We use cookies to identify the computer device with which you connect to
      our Site. We reserve the right to restrict your use and access to our Site
      or part thereof in the event of any unauthorised use.
    </p>
    <p>
      We reserve the right to suspend our Site or any part thereof or terminate
      your Account at any time if we, in our sole discretion, determine that you
      are not using the Site in compliance with these Terms and Conditions or if
      we believe the information provided by you is untrue, inaccurate or
      incomplete.
    </p>
    <p>
      Any indulgence of extension of time granted to you shall not be construed
      as a waiver or variation of any of our rights or remedies in these Terms
      and Conditions or law.
    </p>
    <br />
    <div class="flex flex-jc-sb navigation">
      <a @click="$emit('changePageHandler', 'effect')"
        ><h6>&#60;&#60;&#60; Effects</h6></a
      >
      <a @click="$emit('changePageHandler', 'registration')"
        ><h6>Online Registration &#62;&#62;&#62;</h6></a
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
