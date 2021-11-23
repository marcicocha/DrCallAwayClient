<template>
  <ValidationProvider :vid="$attrs.name" :name="name" :rules="rules" tag="div">
    <a-form-item
      slot-scope="{ errors, flags }"
      :label="label"
      :required="required"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      :validate-status="resolveState({ errors, flags })"
      :help="showErrors ? errors[0] : ''"
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
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'

export default {
  name: 'AppInput',
  components: { ValidationProvider },
  props: {
    value: {
      type: String,
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
    showErrors: {
      type: Boolean,
      default: true,
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
