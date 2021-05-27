<template>
  <div>
    <h6>Links</h6>
    <p>
      No person, business or website may be linked to any page on this Site
      without prior written permission from Savon Nettoyage. Such permission can
      be obtained by sending an e-mail to …………………………..
    </p>
    <p>
      Links to non-Savon Nettoyage websites given on this Site are provided
      “voetstoots” and Savon Nettoyage does not necessarily agree with the
      content of such websites, which Savon Nettoyage is unable to edit or
      underwrite.
    </p>
    <p>
      No person, business or website may use any technology to glean information
      from this Site without prior written permission from Savon Nettoyage. Such
      permission can be obtained by sending an e-mail to …………………………
    </p>
    <br />
    <div class="flex flex-jc-sb navigation">
      <a @click="$emit('changePageHandler', 'termsDiscontinuation')"
        ><h6>&#60;&#60;&#60; Terms and Discontinuation</h6></a
      >
      <a @click="$emit('changePageHandler', 'general')"
        ><h6>General &#62;&#62;&#62;</h6></a
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
