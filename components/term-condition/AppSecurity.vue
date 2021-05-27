<template>
  <div>
    <h6>Security</h6>
    <p>
      Anyone downloading or trying to download malware or damaging coding on
      this Site, or who tries to gain unauthorized access to any page on this
      Site, will be prosecuted and civil damages from such person will be
      claimed if Savon Nettoyage suffers any damage or loss.
    </p>
    <p>
      You agree and guarantee that the username and password you use to log in
      is for your personal use only and will not be passed on to any third
      party.
    </p>
    <p>
      You allow Savon Nettoyage to take all steps reasonably possible to ensure
      the integrity and security of the Site and in the administrative office.
    </p>
    <p>
      All credit/debit card transactions on the Site are protected by standard
      online transactional encryption and reinforced by various encryption
      processes with the aim of offering the most effective possible protection
      of any sensitive information. Savon Nettoyage has no access to any
      confidential information regarding your payment method. Credit/debit card
      transactions have been acquired for Savon Nettoyage via ……….. who are the
      approved payment gateway for the Company’s Bank.
    </p>
    <p>
      Payments may be made via Visa, MasterCard, Diners or American Express
      credit cards or by bank transfer into the Savon Nettoyage’s bank account,
      the details of which will be provided on request.
    </p>
    <p>
      Credit card transactions have been acquired for Savon Nettoyage via
      ……………………. who are the approved payment gateway for……………………. …………… uses the
      strictest form of encryption, namely ………………… and no credit card details
      are stored on the website. Users may go to ……………. to view their security
      certificate and security policy.
    </p>
    <p>
      Customer details will be stored by Savon Nettoyage separately from card
      details which are entered by the client on ………… secure site. For more
      detail on …………. refer to ……………….
    </p>
    <p>
      The merchant outlet country at the time of presenting payment options to
      the cardholder is Nigeria. Transaction Currency is Nigerian Naira (N).
    </p>
    <p>
      Only Savon Nettoyage banking partner will access confidential information
      (such as your credit card number, expiry date, CVV etc.) from time to
      time.
    </p>
    <br />
    <div class="flex flex-jc-sb navigation">
      <a @click="$emit('changePageHandler', 'fraud')"
        ><h6>&#60;&#60;&#60; Fraud</h6></a
      >
      <a @click="$emit('changePageHandler', 'privacyPersonalInformation')"
        ><h6>Privacy and Personal Information &#62;&#62;&#62;</h6></a
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
