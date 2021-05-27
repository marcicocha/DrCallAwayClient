<template>
  <div>
    <h6>Purchase of Services</h6>
    <p>
      <b>Terms of Sale</b>
    </p>
    <p>
      Once you have registered …..account with Savon Nettoyage, you may receive
      access to the Services.
    </p>
    <br />
    <div class="flex flex-jc-sb navigation">
      <a @click="$emit('changePageHandler', 'service')"
        ><h6>&#60;&#60;&#60; The Services</h6></a
      >
      <a @click="$emit('changePageHandler', 'priceTerms')"
        ><h6>Purchase Price and Payment Terms &#62;&#62;&#62;</h6></a
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
