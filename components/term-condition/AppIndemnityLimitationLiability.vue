<template>
  <div>
    <h6>Indemnity and Limitation of Liability</h6>
    <p>
      You agree that neither Savon Nettoyage nor any of its representatives will
      be held responsible for any liability, damages, costs, expenses, loss or
      other accountability of any kind that arises from the use of (or inability
      to use) this Site, its services or content.
    </p>
    <p>
      Furthermore, Savon Nettoyage provides no guarantee, implied or otherwise,
      that the content or technology attached to this Site is free of errors or
      omissions. Nor is there any guarantee whatsoever that service will be 100%
      uninterrupted or faultless. You may however report any possible
      malfunctions and errors by emailing ………
    </p>
    <p>
      It is your responsibility, before accepting these Terms and Conditions, to
      determine whether the service available through this Site satisfies your
      individual needs and is compatible with your hardware or software.
    </p>
    <p>
      We make no representations or warranties regarding the efficacy and/or
      suitability and/or fit for purpose of the Services including in connection
      with any condition.
    </p>
    <p>
      Savon Nettoyage shall not under any circumstances be liable for special,
      indirect and/or consequential losses of any nature whatsoever and the
      liability of Savon Nettoyage in terms hereof shall –
    </p>
    <ul style="margin-left: 1rem">
      <li>not exceed any amount actually spent by you on our Site;</li>
      <li>
        not be capable of being claimed against Savon Nettoyage unless such a
        claim exceeds N 10,000.00 (Ten Thousand Naira);
      </li>
      <li>
        not be capable of being claimed against Savon Nettoyage unless the claim
        arose within 6 (six) months from the date on which the cause of action
        in question arose;
      </li>
    </ul>
    <br />
    <div class="flex flex-jc-sb navigation">
      <a @click="$emit('changePageHandler', 'privacyPersonalInformation')"
        ><h6>&#60;&#60;&#60; Privacy and Personal Information</h6></a
      >
      <a @click="$emit('changePageHandler', 'governingLaw')"
        ><h6>Governing Law and Jurisdiction &#62;&#62;&#62;</h6></a
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
