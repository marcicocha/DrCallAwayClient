<template>
  <ValidationProvider :vid="$attrs.name" :name="name" :rules="rules" tag="div">
    <a-form-item
      slot-scope="{ errors, flags }"
      :label="label"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      :required="required"
      :validate-status="resolveState({ errors, flags })"
      :help="showErrors ? errors[0] : ''"
    >
      <!-- slot-scope="{ errors, flags }" :validate-status="resolveState({ errors, flags })"
    :help="showErrors ? errors[0] : ''" -->
      <a-input-search
        v-model="innerValue"
        :type="inputType"
        :placeholder="placeholder"
        :disabled="disabled"
        :size="size"
        :class="classNames"
        :allow-clear="allowClear"
        @blur="blurHandler"
        @search="onSearch"
      >
        <a-button v-show="innerValue" slot="enterButton"
          ><img src="@/assets/images/admin/save.png" alt="img"
        /></a-button>
      </a-input-search>
    </a-form-item>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'

export default {
  name: 'AppSearch',
  components: {
    ValidationProvider,
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
      default: false,
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
      default: () => /[^0-9]/g,
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
    spaceAllowed: {
      type: Boolean,
      default: true,
    },
    charAllowed: {
      type: Boolean,
      default: true,
    },
    textAllowed: {
      type: Boolean,
      default: true,
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
      switch (true) {
        case !newVal || typeof newVal === 'object':
          this.innerValue = ''
          break
        // NO SPACE ALONE
        case !this.spaceAllowed && this.charAllowed && this.textAllowed:
          this.innerValue = String(newVal)
            .toUpperCase()
            .slice(0, this.maxLength)
            .replace(this.spaceRegex, '')
          break
        // NO SPACE, NO SPECIAL CHARACTER
        case !this.spaceAllowed && !this.charAllowed && this.textAllowed:
          this.innerValue = String(newVal)
            .slice(0, this.maxLength)
            .replace(this.spaceRegex, '')
            .replace(this.specialCharacterRegex, '')
          break
        // NO SPACE, NO SPECIAL CHARACTER, AND NO TEXT
        case !this.spaceAllowed && !this.charAllowed && !this.textAllowed:
          this.innerValue = String(newVal)
            .slice(0, this.maxLength)
            .replace(this.spaceRegex, '')
            .replace(this.specialCharacterRegex, '')
            .replace(this.textOnlyRegex, '')
          break
        // NO SPACIAL CHARACHER ALONE
        case this.spaceAllowed && !this.charAllowed && this.textAllowed:
          this.innerValue = String(newVal)
            .slice(0, this.maxLength)
            .replace(this.specialCharacterRegex, '')
          break
        // NO SPACIAL CHARACHER, NO TEXT
        case this.spaceAllowed && !this.charAllowed && !this.textAllowed:
          this.innerValue = String(newVal)
            .slice(0, this.maxLength)
            .replace(this.specialCharacterRegex, '')
            .replace(this.textOnlyRegex, '')
          break
        // NO TEXT ALONE
        case this.spaceAllowed && this.charAllowed && !this.textAllowed:
          this.innerValue = String(newVal)
            .slice(0, this.maxLength)
            .replace(this.textOnlyRegex, '')
          break

        default:
          this.innerValue = String(newVal).slice(0, this.maxLength)
          break
      }
      this.$nextTick(() => {
        this.$emit('input', newVal)
      })
    },
    value: {
      handler(newVal) {
        if (!newVal) {
          this.innerValue = ''
        } else {
          this.innerValue = newVal
        }
      },
      immediate: true,
    },
  },
  methods: {
    blurHandler(e) {
      this.$emit('blur', this.innerValue)
    },
    onSearch(e) {
      this.$emit('search', this.innerValue)
    },
    resolveState({ errors, flags }) {
      if (errors[0]) {
        return 'error'
      }

      // if (flags.pending) {
      //   return 'validating'
      // }

      // if (flags.valid) {
      //   return 'success'
      // }

      return ''
    },
  },
}
</script>
