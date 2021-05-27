<template>
  <div>
    <h6>Notices</h6>
    <p>
      Savon Nettoyage chooses as its address for all purposes under these Terms
      and Conditions, whether in respect of court process, notice, or other
      documents or communication of whatsoever nature of the address/contact
      details set out at clause 22 below.
    </p>

    <br />
    <div class="flex flex-jc-sb navigation">
      <a @click="$emit('changePageHandler', 'disputes')"
        ><h6>&#60;&#60;&#60; Disputes</h6></a
      >
      <a @click="$emit('changePageHandler', 'advertising')"
        ><h6>Advertising &#62;&#62;&#62;</h6></a
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
