<template>
  <div class="card">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'AppCard',
}
</script>
<style lang="scss" scoped>
.card {
  box-shadow: 0px 3px 6px rgba(53, 64, 82, 0.43);
  border-radius: 10px;
  padding: 2rem;
}
</style>
