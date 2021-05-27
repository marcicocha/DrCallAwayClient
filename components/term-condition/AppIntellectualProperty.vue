<template>
  <div>
    <h6>Intellectual Property And Use Of Our Logos, Content and Images</h6>
    <p>
      All rights, including copyright, trade mark and other intellectual
      property rights embodied in any software, graphics, icons, links, private
      information, designs, logos, text, images, video, audio or other material
      on this Site are owned by or licensed to us. All data and information
      communicated to or from the Site including its database also belongs
      solely to us or our licensors. You agree to sign all documents as we may
      reasonably require in order to assign any rights that you may acquire in
      the content of our Site. You agree also to waive any moral rights in such
      content.
    </p>
    <p>
      You are permitted to view, print or store electronically a copy of any
      information on our Site, including these Terms and Conditions, solely for
      your personal, lawful, non-commercial use. Unauthorised use, reproduction,
      modification and/or distribution is strictly prohibited and constitutes an
      unlawful infringement of our intellectual property rights.
    </p>
    <p>
      Savon Nettoyage is unable to edit or screen all content on the Site, and
      will not be accountable for illegal, libellous or obscene content. We
      advise you to notify us of any offensive or illegal material.
    </p>
    <br />
    <div class="flex flex-jc-sb navigation">
      <a @click="$emit('changePageHandler', 'guarantee')"
        ><h6>&#60;&#60;&#60; Guarantee and Complaints Mgt</h6></a
      >
      <a @click="$emit('changePageHandler', 'termsDiscontinuation')"
        ><h6>Terms and Discontinuation &#62;&#62;&#62;</h6></a
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
