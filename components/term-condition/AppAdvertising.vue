<template>
  <div>
    <h6>Advertising</h6>
    <p>
      Advertising and other promotional material of third parties may appear on
      our Site from time to time. We do not endorse such third parties or their
      products and/or services. Your reliance on any information contained in
      such material is entirely at your own risk.
    </p>

    <br />
    <div class="flex flex-jc-sb navigation">
      <a @click="$emit('changePageHandler', 'notices')"
        ><h6>&#60;&#60;&#60; Notices</h6></a
      >
      <a @click="$emit('changePageHandler', 'guarantee')"
        ><h6>Guarantee and Complaints Mgt &#62;&#62;&#62;</h6></a
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
