<template>
  <a-button
    :type="type"
    :icon="icon"
    :size="size"
    :loading="loading"
    :block="block"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </a-button>
</template>

<script>
export default {
  name: 'AppButton',

  props: {
    type: {
      type: String,
      default: 'primary',
    },
    icon: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'large',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    background: {
      type: String,
      default: '#fdb813',
    },
    block: {
      type: Boolean,
      default: true,
    },
    hover: {
      type: Boolean,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
  },
  // computed: {
  //   btnStyle() {
  //     const style = {
  //       'background-color': this.background,
  //       color: this.color,
  //     }
  //     return style
  //   },
  // },
}
</script>
