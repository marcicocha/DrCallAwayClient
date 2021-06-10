<template>
  <div class="tab">
    <a-tabs v-model="innerValue" default-active-key="1">
      <slot name="default"></slot>
    </a-tabs>

    <slot name="rightInfo"></slot>
  </div>
</template>
<script>
export default {
  name: 'AppTabs',
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
  },
  data() {
    return {
      innerValue: '',
    }
  },
  watch: {
    value: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.innerValue = newVal
        } else {
          this.innerValue = undefined
        }
      },
      immediate: true,
    },
    innerValue: {
      handler(newVal, oldVal) {
        this.$emit('input', newVal)
      },
      immediate: true,
    },
  },
  created() {
    if (this.value) {
      this.innerValue = this.value
    } else {
      this.innerValue = undefined
    }
  },
}
</script>
<style lang="scss" scoped>
.tab {
  position: relative;
}
</style>
