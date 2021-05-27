<template>
  <div>
    <h6>Terms and Discontinuation</h6>
    <p>
      These Terms and Conditions take effect on the date of first publication of
      the Site and continue indeterminately. They may be revised by Savon
      Nettoyage from time to time (as described above), for as long as the Site
      continues to exist and be operated. Savon Nettoyage is entitled to
      terminate these Terms and Conditions or close down the Site at any time,
      subject to processing any pending purchases.
    </p>
    <p>
      If you do not meet your obligations regarding these Terms and Conditions,
      including any incidents about payment and price or an Order, and you
      neglect to rectify such non-adherence within 5 (five) Business Days after
      Savon Nettoyage has instructed you to do so, your access to the service
      will be blocked.
    </p>
    <p>
      We have the right to close your Account and deny you access to the Site,
      depending on the severity of your actions. Such action on the part of
      Savon Nettoyage will not have any negative effect on any damages Savon
      Nettoyage may claim.
    </p>
    <p>
      Savon Nettoyage may, in its sole discretion, change this agreement or any
      part thereof at any time without notice.
    </p>
    <br />
    <div class="flex flex-jc-sb navigation">
      <a @click="$emit('changePageHandler', 'intellectualProperty')"
        ><h6>&#60;&#60;&#60; Intellectual Property</h6></a
      >
      <a @click="$emit('changePageHandler', 'link')"
        ><h6>Links &#62;&#62;&#62;</h6></a
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
