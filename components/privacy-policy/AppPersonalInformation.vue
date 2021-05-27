<template>
  <div>
    <h6>Personal Information</h6>
    <p>
      In addition to the information provided automatically by your browser when
      you visit our Website, to become a subscriber to our Services, you may be
      required to create a personal profile which may entail registration with
      your email and creating a user name and password. It is your
      responsibility to keep your password safe and secured as Savon Nettoyage
      bears no liability for any disclosure of your password.
    </p>
    <p>
      The purpose of our collecting your personal information is to give you
      efficient, enjoyable and secure service. The personal information we
      collect from you including but not limited to your name, age, gender,
      phone number, email address, may be retained on our Website for future
      reference. Such personal information may serve a variety of uses,
      including notifying you about our products and services, notifying you
      about promotions and offers, and for any other reason we deem relevant.
    </p>
    <br />
    <div class="flex flex-jc-sb navigation">
      <a @click="$emit('changePageHandler', 'introduction')"
        ><h6>&#60;&#60;&#60; Introduction</h6></a
      >
      <a @click="$emit('changePageHandler', 'periodicSurvey')"
        ><h6>Periodic Survey &#62;&#62;&#62;</h6></a
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
