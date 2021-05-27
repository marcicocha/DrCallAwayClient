<template>
  <div>
    <h6>Guarantee and Complaints Management</h6>
    <p>
      We shall perform our obligations under these Terms and Conditions with
      reasonable skills and care.
    </p>
    <p>
      We place great value on our customer satisfaction. You may contact us at
      any time using the contact details given in clause 22 of these Terms and
      Conditions. We will attempt to address your concerns as soon as reasonably
      possible and will contact you on receipt of any relevant enquiry or
      complaint. In guarantee cases, the manufacturer frequently must be
      involved, and as such it may take longer to resolve such an enquiry or
      complaint.
    </p>

    <br />
    <div class="flex flex-jc-sb navigation">
      <a @click="$emit('changePageHandler', 'advertising')"
        ><h6>&#60;&#60;&#60; Advertising</h6></a
      >
      <a @click="$emit('changePageHandler', 'intellectualProperty')"
        ><h6>Intellectual Property &#62;&#62;&#62;</h6></a
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
