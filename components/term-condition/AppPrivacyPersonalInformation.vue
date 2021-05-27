<template>
  <div>
    <h6>Privacy and Personal Information</h6>
    <p>
      The user expressly gives and, to the extent applicable, is and will be
      deemed to have provided express permission for the collection, collation,
      processing, receipt, storage, recording, updating, modifying, retrieval,
      dissemination and distribution of his/her personal information for the
      purposes set out herein, which Savon Nettoyage is entitled, but not
      obliged to do.
    </p>
    <p>
      Subject to all and/or any laws to the contrary, the user must and will –
    </p>
    <ul style="margin-left: 1rem">
      <li>
        provide Savon Nettoyage with the personal and contact details and
        information as required by it in order to administer the Services, as
        the case may be; and/or
      </li>
      <li>
        inform Savon Nettoyage, in writing, within 7 (seven) days of any change
        to any of the information provided by the user in relation to the
        Services.
      </li>
    </ul>
    <p>
      The user hereby authorizes Savon Nettoyage (who will not be obliged to),
      subject to any and/or all applicable laws, to –
    </p>
    <ul style="margin-left: 1rem">
      <li>
        access from any credit bureau, his/her personal information concerning
        financial risk and payment habits for purposes of fraud prevention and
        debtor tracing, and to disclose information regarding his/her payment
        profile to such credit bureau; and/or
      </li>
      <li>
        use information that Savon Nettoyage may have in relation to the user
        for purposes of processing any request; and/or
      </li>
      <li>administering these Terms and Conditions; and/or</li>
      <li>informing the user of any new aspects of the Services.</li>
    </ul>
    <p>
      This website is governed by the laws of Nigeria and Savon Nettoyage
      chooses as its <i>domicilium citandi et executandi</i> for all purposes
      under this agreement, whether in respect of court process, notice, or
      other documents or communication of whatsoever nature, the address at 1.2
      above.
    </p>
    <p>
      Savon Nettoyage shall take all reasonable steps to protect the personal
      information of users.
    </p>
    <br />
    <div class="flex flex-jc-sb navigation">
      <a @click="$emit('changePageHandler', 'security')"
        ><h6>&#60;&#60;&#60; Security</h6></a
      >
      <a @click="$emit('changePageHandler', 'indemnityLimitation')"
        ><h6>Indemnity and Limitation of Liability &#62;&#62;&#62;</h6></a
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
