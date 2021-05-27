<template>
  <div>
    <h6>The Services</h6>
    <p>
      The Services displayed on our Site are subject to availability. The
      Services may be reviewed, updated, added to and/or removed by Savon
      Nettoyage from time to time, meaning that the Services is not exhaustive
      and may be varied from time to time to bring it in line with the current
      service offerings by Savon Nettoyage.
    </p>
    <p>
      The Services are not intended nor suited to be a replacement or substitute
      for professional medical advice, any real or perceived or impending
      medical emergency, consultation, examination, diagnosis or treatment
      relative to a specific medical question or condition. All information
      obtained by a Customer on, through and/or by means of the Services, is
      solely for informational purpose only. Should any real or perceived or
      impending emergency exist, Users must seek medical attention without delay
      and Savon Nettoyage and/or the administrators of the file accept no
      liability in this regard should a User fail and/or neglect to seek medical
      attention immediately.
    </p>
    <p>
      All subscriptions for users to gain access to the Site is subject to the
      approval of Savon Nettoyage in its discretion. Savon Nettoyage will have
      the unfettered right to accept or reject any offer for any of its
      services, made by a user. Savon Nettoyage will be entitled to take steps
      to restrict or suspend the Services to a user who misuses the Services.
    </p>
    <p>
      The user specifically represents and warrants to and in favour of Savon
      Nettoyage that all information conveyed, preferred, provided and/or
      communicated to any Doctor in making use of the Services will be
      absolutely true and correct in every respect and regard and hereby
      acknowledges the importance as to the serious consequences if such
      information is not as represented and warranted. Subject to any and/or all
      applicable laws, Savon Nettoyage makes no warranty or representation,
      whether expressly or implicitly –
    </p>
    <ul style="margin-left: 1rem">
      <li>
        about any component of the Services, or that the user will be able to
        have access to or continue to have access to the Services, that such
        access will be continuous and/or uninterrupted; and/or
      </li>
      <li>
        as to the quality of reception by the user of the Services, as Savon
        Nettoyage cannot be responsible or liable for electronic media or
        coverage through, on and/or via such electronic means as these factors
        is and will be beyond its control; and/or
      </li>
      <li>
        that the software used to provide the Services including any software
        applications is virus or error free, flawless or without fault; and/or
      </li>
      <li>
        that the Services will at all times be free of errors or interruptions,
        be always available, fit for any purposes, not infringe any third party
        rights, be secure and reliable, or will conform to its delivery timeline
        requirements; and
      </li>
    </ul>
    <p>
      Savon Nettoyage will use its reasonable endeavours to make its Services
      available to the user and to maintain the availability thereof on the
      understanding such Services are provided on a “as is” and “as available”
      basis.
    </p>
    <br />
    <div class="flex flex-jc-sb navigation">
      <a @click="$emit('changePageHandler', 'registration')"
        ><h6>&#60;&#60;&#60; Online Registration</h6></a
      >
      <a @click="$emit('changePageHandler', 'purchaseService')"
        ><h6>Purchase of Services &#62;&#62;&#62;</h6></a
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
