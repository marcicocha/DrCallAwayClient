<template>
  <a-form-item
    :label="label"
    :required="required"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-textarea
      v-model="innerValue"
      type="text"
      :placeholder="placeholder"
      :size="size"
      :rows="rows"
      :disabled="disabled"
      @blur="blurHandler"
    />
  </a-form-item>
</template>

<script>
export default {
  name: 'AppInput',
  components: {},
  props: {
    value: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'default',
    },
    wrapperCol: {
      type: Object,
      default: () => {},
    },
    labelCol: {
      type: Object,
      default: () => {},
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    rows: {
      type: Number,
      default: 4,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      innerValue: '',
    }
  },
  computed: {
    classObject() {
      return {
        'ant-input-lg': this.size === 'large',
        'ant-input-sm': this.size === 'small',
        'ant-input-disabled': this.disabled,
      }
    },
  },
  watch: {
    value: {
      handler(newVal, oldVal) {
        if (newVal && (newVal !== '' || newVal.length > 0)) {
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
  methods: {
    blurHandler(e) {
      this.$emit('blur', e.target.value)
    },
  },
}
</script>
