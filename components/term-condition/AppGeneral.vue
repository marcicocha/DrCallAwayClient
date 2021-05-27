<template>
  <div>
    <h6>General</h6>
    <p>
      No failure or delay by us or you in exercising any right under these Terms
      and Conditions shall operate as a waiver of such right or extend to or
      affect any other or subsequent event or impair any rights or remedies in
      respect of it or in any way modify or diminish our or your rights under
      these Terms and Conditions.
    </p>
    <p>
      If any clause in these Terms and Conditions shall become or shall be
      declared by any court of competent jurisdiction to be invalid or
      unenforceable, such invalidity or unenforceability shall in no way affect
      any other clause or part of any clause, all of which shall remain in full
      force and effect, so long as these Terms and Conditions shall be capable
      of continuing in effect without the unenforceable term.
    </p>
    <p>
      You shall not assign, transfer, novate, charge, sub-contract, create any
      trust over or deal in any other manner with these Terms and Conditions or
      all or any of your rights or obligations under these Terms and Conditions.
    </p>
    <p>
      Nothing in these Terms and Conditions shall create or be deemed to create
      a partnership, an agency or a relationship of employer and employee
      between you and us.
    </p>
    <p>
      No person who is not a party to these Terms and Conditions shall acquire
      any rights under it or be entitled to benefit from any of its terms even
      if that person has relied on any such term or has indicated to any party
      to these Terms and Conditions its assent to any such term.
    </p>
    <p>
      Any and all copyright subsisting in the Site, including theses Terms and
      Conditions, vests in Savon Nettoyage and all rights not expressly granted
      are reserved.
    </p>
    <p>
      When you visit the Site or send e-mails to Savon Nettoyage, you consent to
      receiving communications from Savon Nettoyage electronically and agree
      that all agreements, notices, disclosures and other communications sent by
      Savon Nettoyage satisfy any legal requirements, including but not limited
      to the requirement that such communications should be in “writing”.
    </p>
    <br />
    <div class="flex flex-jc-sb navigation">
      <a @click="$emit('changePageHandler', 'link')"
        ><h6>&#60;&#60;&#60; Links</h6></a
      >
      <a @click="$emit('changePageHandler', 'disclaimer')"
        ><h6>Disclaimer &#62;&#62;&#62;</h6></a
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
