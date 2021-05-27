<template>
  <div>
    <h6>Purchase Price and Payment Terms</h6>
    <p>
      You will be charged the prices as they are reflected on the Site at the
      time you receive the Service, subject to availability. All prices shown
      are quoted in Nigerian Naira and include Value-Added Tax.
    </p>
    <p>
      In order to gain access to the Services, all payments must be made upfront
      and in advance prior to making use of the Services. Payment for the
      Services will be accepted either by means of authorised debit/credit card
      payment or by means of direct deposit into the Nominated Bank Account. We
      will debit the total value of your online Service, on a prepaid basis,
      against the payment card tendered by you during the checkout process.
      Payment will be effected on acceptance of the Service. Should you elect to
      pay for the Services by means of direct deposit, kindly send proof of
      payment to …… , whereafter, once the payment has been cleared, access to
      the Services will be gained.
    </p>
    <p>
      The provision of goods and services by Savon Nettoyage is subject to
      availability. In cases of unavailability, Savon Nettoyage will refund the
      client in full within 30 days. Cancellation of orders by the client will
      attract a 50% administration fee.
    </p>
    <p>
      By submitting for the Service, identity number and payment card details
      you warrant that you are or over the age of 18 (eighteen), are authorised
      to make payment with the payment card and that there are sufficient funds
      available to pay for the Service.
    </p>
    <br />
    <div class="flex flex-jc-sb navigation">
      <a @click="$emit('changePageHandler', 'purchaseService')"
        ><h6>&#60;&#60;&#60; Purchase of Services</h6></a
      >
      <a @click="$emit('changePageHandler', 'fraud')"
        ><h6>Fraud &#62;&#62;&#62;</h6></a
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
