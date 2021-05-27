<template>
  <div>
    <h6>Online Registration</h6>
    <p>
      In order to have access to the Services, you will be required to register
      a …..account with Savon Nettoyage. This will require you to provide
      certain information including personal details and banking details. When
      registering you will be required to choose your login and password.
    </p>
    <p>
      It is your responsibility to maintain confidentiality of any account name
      you create and/or password associated with such account. Savon Nettoyage
      accepts no liability for any damages suffered or losses incurred from the
      use or misuse of your password.
    </p>

    <p>
      By providing your contact information, you address to receive information
      including but not limited to availability of services, promotions and
      other information Savon Nettoyage may deem fit to send to you from time to
      time.
    </p>
    <br />
    <div class="flex flex-jc-sb navigation">
      <a @click="$emit('changePageHandler', 'ourWebsite')"
        ><h6>&#60;&#60;&#60; Use of Our Website</h6></a
      >
      <a @click="$emit('changePageHandler', 'service')"
        ><h6>The Services &#62;&#62;&#62;</h6></a
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
