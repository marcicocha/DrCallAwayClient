<template>
  <div>
    <h6>Status</h6>
    <p>
      By accessing the Services or using the Site, you certify that you are
      atleast 18 (eighteen) years or above the age majority in your jurisdiction
      and possess a valid credit card or cheque card issued by a bank acceptable
      to us.
    </p>
    <br />
    <div class="flex flex-jc-sb navigation">
      <a @click="$emit('changePageHandler', 'introduction')"
        ><h6>&#60;&#60;&#60; Introduction</h6></a
      >
      <a @click="$emit('changePageHandler', 'effect')"
        ><h6>Effect &#62;&#62;&#62;</h6></a
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
