<template>
  <div>
    <p>
      <span class="title">{{ title }}</span>
      <slot></slot>
    </p>
  </div>
</template>
<script>
export default {
  name: 'AppTitleDivider',
  props: { title: { type: String, default: '' } },
}
</script>
<style lang="scss" scoped>
p {
  font-size: 18px;
  border-bottom: 2px solid rgba(226, 231, 238, 1);
  color: $dark-purple;
  padding-bottom: 0.875rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  position: relative;
  .title {
    padding-bottom: 1.15rem;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 3px;
      background: $dark-purple;
      border-radius: 10px;
    }
  }
  .right-details {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
  }
}
</style>
