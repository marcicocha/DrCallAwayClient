<template>
  <ValidationProvider :vid="$attrs.name" :name="name" :rules="rules">
    <a-form-item
      slot-scope="{ errors, flags }"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      :label="label"
      :validate-status="resolveState({ errors, flags })"
      :help="showErrors ? errors[0] : ''"
      :required="required"
    >
      <a-date-picker
        v-model="innerValue"
        v-decorator="vDecorator"
        default
        :placeholder="placeholder"
        :show-time="showTime"
        :format="format"
        :size="size"
        :default-picker-value="defaultPickerValue"
        :disabled="disabled || readonly"
        :disabled-time="disabledTime"
        :disabled-date="disabledDate"
        style="width: 100%"
        @openChange="handleChange"
        @change="changeHandler"
      />
      <!-- <slot v-if="readonly" name="readonly" :value="value">
        <div>
          <span class="profile__field">{{ formatDate(value) }}</span>
        </div>
      </slot> -->
    </a-form-item>
  </ValidationProvider>
</template>
<script>
import moment from 'moment'
import { ValidationProvider } from 'vee-validate'

export default {
  name: 'AppDatePicker',
  components: {
    ValidationProvider,
  },
  props: {
    name: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      validator: (prop) => ['default', 'large', 'small'].includes(prop),
      default: 'default',
    },
    placeholder: {
      type: String,
      default: '',
    },
    format: {
      type: String,
      default: 'DD-MM-YYYY',
    },
    defaultPickerValue: {
      type: [Object, String],
      default: () => {},
    },
    showTime: {
      type: Boolean,
      default: false,
    },
    labelCol: {
      type: Object,
      default: () => {},
    },
    wrapperCol: {
      type: Object,
      default: () => {},
    },
    vDecorator: {
      type: Array,
      default: () => [],
    },
    colon: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [Object, String],
      default: () => {},
    },
    rules: {
      type: [Object, String],
      default: '',
    },
    showErrors: {
      type: Boolean,
      default: true,
    },
    disabledDate: {
      type: Function,
      default: () => {},
    },
    disabledTime: {
      type: Function,
      default: () => {},
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      innerValue: null,
    }
  },
  computed: {},
  watch: {
    // Handles internal model changes.
    innerValue(newVal) {
      this.$emit('input', newVal)
    },
    // Handles external model changes.
    value(newVal) {
      if (!newVal) {
        this.innerValue = undefined
        return
      }
      this.innerValue = newVal
    },
  },
  created() {
    if (this.value) {
      this.innerValue = this.value
    }
  },
  methods: {
    resolveState({ errors, flags }) {
      //   if (errors[0]) {
      //     return 'error'
      //   }
      //   if (flags.pending) {
      //     return 'validating'
      //   }
      //   if (flags.valid) {
      //     return 'success'
      //   }
      return ''
    },
    handleChange(open) {
      this.$emit('openChange', open)
    },
    changeHandler(e) {
      this.$emit('change', e)
    },
    dateFormatterHandler(dateStr, format = 'YYYY-MM-DD') {
      if (!dateStr) {
        return undefined
      }
      const _date = moment(dateStr, format).isValid()
        ? moment(dateStr, format)
        : moment()
      return _date
    },
  },
}
</script>
