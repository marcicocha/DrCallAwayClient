<template>
  <div>
    <h6>Fraud</h6>
    <p>
      <b>Savon Nettoyage</b> reserves the right, in the interest of preventing
      fraud, to refuse the processing of payment for the Service.
    </p>
    <p>
      Savon Nettoyage may request documentation to complete the necessary fraud
      checks and cancel the Service where the necessary documentation is not
      provided in a timely manner.
    </p>
    <p>
      In the event of a fraudulent purchase being placed on Savon Nettoyage,
      cardholders will be advised to initiate a chargeback via their bank in
      order to be refunded. Savon Nettoyage does not process refunds for
      Services suspected of fraud.
    </p>
    <br />
    <div class="flex flex-jc-sb navigation">
      <a @click="$emit('changePageHandler', 'priceTerms')"
        ><h6>&#60;&#60;&#60; Purchase Price and Payment Terms</h6></a
      >
      <a @click="$emit('changePageHandler', 'security')"
        ><h6>Security &#62;&#62;&#62;</h6></a
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
