<template>
  <div>
    <a-form-item>
      <a-checkbox
        v-model="innerValue"
        :disabled="disabled"
        @change="changeHandler"
      >
        {{ label }}
      </a-checkbox>
    </a-form-item>
  </div>
</template>
<script>
export default {
  name: 'AppCheckbox',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      innerValue: false,
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
  methods: {
    changeHandler(e) {
      this.$emit('blur', this.innerValue)
    },
  },
}
</script>
