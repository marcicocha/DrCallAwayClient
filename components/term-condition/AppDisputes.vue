<template>
  <div>
    <h6>Disputes</h6>
    <p>
      Any dispute shall be resolved by exploring amicable settlement resolution
      through Laws of arbitration of Nigeria before resorting to litigation by
      Nigerian courts.
    </p>

    <br />
    <div class="flex flex-jc-sb navigation">
      <a @click="$emit('changePageHandler', 'governingLaw')"
        ><h6>&#60;&#60;&#60; Governing Law and Jurisdiction</h6></a
      >
      <a @click="$emit('changePageHandler', 'notices')"
        ><h6>Notices &#62;&#62;&#62;</h6></a
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
