<template>
  <div>
    <a-form-item :label="label">
      <a-checkbox-group
        v-model="innerValue"
        :options="options"
        :disabled="disabled"
        @change="changeHandler"
      >
        {{ label }}
      </a-checkbox-group>
    </a-form-item>
  </div>
</template>
<script>
export default {
  name: 'AppCheckboxGroup',
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    label: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      innerValue: [],
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
      console.log(this.innerValue)
      this.$emit('blur', this.innerValue)
    },
  },
}
</script>
