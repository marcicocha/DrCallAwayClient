<template>
  <div>
    <h6>Savon Nettoyage Corporate Information</h6>
    <p>
      Core business: Provision of access to medical services through online
      platforms
    </p>
    <br />
    <p>Legal notice address:</p>
    <p>Plot 1437 Sanusi Fafunwa Street,</p>
    <p>Victoria Island, Lagos</p>
    <p>Tel: …………………</p>
    <br />
    <a @click="$emit('changePageHandler', 'disclaimer')"
      ><h6>Disclaimer >>></h6></a
    >
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
