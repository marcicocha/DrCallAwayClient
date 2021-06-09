<template>
  <div class="full-input">
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
        cols="50"
        :disabled="disabled"
        @blur="blurHandler"
      />
    </a-form-item>
  </div>
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
<style lang="scss" scoped>
textarea {
  outline: none;
  border: none;
  display: block;
  font-family: 'GothamLight', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 150%;
  color: #2e434e;
  width: 100%;
}
@media only screen and (max-width: 991px) {
  textarea {
    font-size: 13px !important;
    line-height: 195%;
  }
}
@media only screen and (min-width: 1536px) {
  @media only screen and (min-height: 730px) {
    textarea {
      font-size: 12px !important;
      line-height: 195%;
    }
  }
  @media only screen and (min-height: 900px) {
    textarea {
      font-size: 14px !important;
      line-height: 195%;
    }
  }
}
</style>
