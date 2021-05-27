<template>
  <div>
    <h6>Periodic Survey</h6>
    <p>
      In order to allow us continually improve our level of service to you; we
      collect and analyze data about our users' activity on our website. We may
      also periodically request you to participate in surveys that will give us
      an indication of your assessment of our level of service, allow us
      customize your experience on our website, and inform us of ways in which
      we can improve our service offering
    </p>
    <br />
    <div class="flex flex-jc-sb navigation">
      <a @click="$emit('changePageHandler', 'personalInformation')"
        ><h6>&#60;&#60;&#60; Personal Information</h6></a
      >
      <a @click="$emit('changePageHandler', 'dataRight')"
        ><h6>Data Confidentiality Right &#62;&#62;&#62;</h6></a
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
