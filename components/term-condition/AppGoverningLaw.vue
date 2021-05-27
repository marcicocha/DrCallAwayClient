<template>
  <div>
    <h6>Governing Law and Jurisdiction</h6>
    <p>
      This Site is offered, controlled and run from Nigeria and as such it is
      governed by Nigerian legislation, and subject to the dispute’s clause in
      these Terms and Conditions.
    </p>
    <p>
      You and Savon Nettoyage are subject to the exclusive jurisdiction of the
      Nigerian courts. Each and every section of these Terms and Conditions must
      be read as individual and separable from the rest of the Terms and
      Conditions.
    </p>
    <p>
      It is your responsibility, before accepting these Terms and Conditions, to
      determine whether the service available through this Site satisfies your
      individual needs and is compatible with your hardware or software.
    </p>
    <p>
      Should any court or qualified authority find that any of the Terms and
      Conditions are invalid or unenforceable, the remainder of the Terms and
      Conditions will remain standing, despite invalidity or unenforceability of
      an individual term.
    </p>
    <br />
    <div class="flex flex-jc-sb navigation">
      <a @click="$emit('changePageHandler', 'indemnityLimitation')"
        ><h6>&#60;&#60;&#60; Indemnity and Limitation of Liability</h6></a
      >
      <a @click="$emit('changePageHandler', 'disputes')"
        ><h6>Disputes &#62;&#62;&#62;</h6></a
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
