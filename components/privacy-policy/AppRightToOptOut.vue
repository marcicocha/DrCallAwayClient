<template>
  <div>
    <h6>Right To Opt Out</h6>
    <p>
      You have the right at any time to prevent us from sending marketing
      information to you by opting out of such promotional communications or
      unsubscribing to same following the steps provided in the said emails. You
      accept however that despite your opting out or unsubscribing, Savon
      Nettoyage reserves the right to send administrative emails to you
      including but not limited to update on its Privacy Policy and Terms and
      Conditions.
    </p>
    <br />
    <div class="flex flex-jc-sb navigation">
      <a @click="$emit('changePageHandler', 'security')"
        ><h6>&#60;&#60;&#60; Security</h6></a
      >
      <a @click="$emit('changePageHandler', 'linkWebsites')"
        ><h6>Link To Other Websites &#62;&#62;&#62;</h6></a
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
