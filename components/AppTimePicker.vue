<template>
  <ValidationProvider :vid="$attrs.name" :name="name" :rules="rules">
    <a-form-item
      slot-scope="{ errors, flags }"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      :label="label"
      :validate-status="resolveState({ errors, flags })"
      :help="showErrors ? errors[0] : ''"
      :colon="!readonly"
      :required="required"
    >
      <a-time-picker
        v-model="innerValue"
        :placeholder="placeholder"
        :format="format"
        :disabled="disabled || readonly"
        style="width: 100%"
        :disabled-hours="disabledHours"
        :disabled-minutes="disabledMinutes"
        :disabled-seconds="disabledSeconds"
        :value-format="valueFormat"
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
  name: 'AppTimePicker',
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
    placeholder: {
      type: String,
      default: '',
    },
    format: {
      type: String,
      default: 'h:mm:ss A',
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
    disabled: {
      type: Boolean,
      default: false,
    },
    disabledHours: {
      type: Function,
      default: () => {},
    },
    disabledMinutes: {
      type: Function,
      default: () => {},
    },
    disabledSeconds: {
      type: Function,
      default: () => {},
    },
    valueFormat: {
      type: [String, Object],
      default: () => undefined,
    },
  },
  data() {
    return {
      innerValue: null,
    }
  },
  watch: {
    // Handles internal model changes.
    innerValue(newVal) {
      this.$emit('input', newVal)
    },
    // Handles external model changes.
    value(newVal) {
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
      //     return 'error';
      //   }
      //   if (flags.pending) {
      //     return 'validating';
      //   }
      //   if (flags.valid) {
      //     return 'success';
      //   }
      return ''
    },
    formatDate(value) {
      if (!value) {
        return 'NA'
      }
      return moment(value).format(this.format)
    },
    changeHandler(value) {
      this.$emit('change', value)
    },
  },
}
</script>
