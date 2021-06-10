<template>
  <!-- <ValidationProvider :vid="$attrs.name" :name="name" :rules="rules" tag="div"> -->
  <a-form-item
    :label="label"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    :required="required"
  >
    <!-- slot-scope="{ errors, flags }" :validate-status="resolveState({ errors, flags })"
    :help="showErrors ? errors[0] : ''" -->
    <a-input
      v-model="innerValue"
      :type="inputType"
      :placeholder="placeholder"
      :disabled="disabled"
      :size="size"
      :class="classNames"
      :allow-clear="allowClear"
      :max-length="parseInt(maxLength, 10)"
      @blur="blurHandler"
    />
  </a-form-item>
  <!-- </ValidationProvider> -->
</template>

<script>
// import { ValidationProvider } from 'vee-validate'

export default {
  name: 'AppInput',
  components: {
    // ValidationProvider,
  },
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    rules: {
      type: [Object, String],
      default: '',
    },
    showErrors: {
      type: Boolean,
      default: true,
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    labelCol: {
      type: Object,
      default: () => {},
    },
    allowClear: {
      type: Boolean,
      default: true,
    },
    wrapperCol: {
      type: Object,
      default: () => {},
    },
    classNames: {
      type: Array,
      default: () => [],
    },
    size: {
      type: String,
      default: 'default',
    },
    inputType: {
      type: String,
      default: 'text',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    isUpperCase: {
      type: Boolean,
      default: false,
    },
    isNumber: {
      type: Boolean,
      default: false,
    },
    isText: {
      type: Boolean,
      default: false,
    },
    isPhone: {
      type: Boolean,
      default: false,
    },
    numberOnlyRegex: {
      type: RegExp,
      default: () => /[^0-9]/g,
    },
    textOnlyRegex: {
      type: RegExp,
      default: () => /[0-9]/g,
    },
    phoneOnlyRegex: {
      type: RegExp,
      default: () => /^(?:\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}$/,
    },
    maxLength: {
      type: [Number, String],
      default: '100',
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
    innerValue(newVal) {
      this.$nextTick(() => {
        this.$emit('input', newVal)
      })
    },
    value: {
      handler(newVal) {
        if (!newVal) {
          this.innerValue = ''
          return
        } else if (newVal) {
          if (this.isNumber && !this.isText && !this.isPhone) {
            this.innerValue = String(newVal)
              .slice(0, this.maxLength)
              .replace(this.numberOnlyRegex, '')
          } else if (!this.isNumber && this.isText && !this.isPhone) {
            this.innerValue = String(newVal)
              .slice(0, this.maxLength)
              .replace(this.textOnlyRegex, '')
          } else if (!this.isNumber && !this.isText && this.isPhone) {
            this.innerValue = String(newVal)
              .slice(0, 15)
              .replace(this.numberOnlyRegex, '')
          } else {
            this.innerValue = String(newVal).slice(0, this.maxLength)
          }
        }
        this.innerValue = newVal
      },
      immediate: true,
    },
  },
  methods: {
    blurHandler(e) {
      this.$emit('blur', this.innerValue)
    },
    resolveState({ errors, flags }) {
      if (errors[0]) {
        return 'error'
      }

      if (flags.pending) {
        return 'validating'
      }

      if (flags.valid) {
        return 'success'
      }

      return ''
    },
  },
}
</script>
