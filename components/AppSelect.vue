<template>
  <a-form-item
    :label="label"
    :required="required"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <!-- <label for="name">{{ label }}</label> -->
    <a-select
      v-model="innerValue"
      mode="default"
      show-search
      style="width: 100%"
      :loading="fetching"
      :disabled="disabled"
      :placeholder="placeholder"
      :allow-clear="allowClear"
      :default-value="defaultValue"
      @blur="blurHandler"
      @change="changeHandler"
      @focus="searchHandler"
      @select="selectHandler"
    >
      <template v-if="remote && dataRemote">
        <a-select-option
          v-for="d in dataRemote"
          :key="d.value"
          :title="d.text"
          :value="d.text"
        >
          {{ d.text }}
        </a-select-option>
      </template>
      <template v-else>
        <template v-if="data && data.length !== ''">
          <a-select-option
            v-for="(i, index) in data"
            :key="i + '-' + index"
            :value="i"
          >
            {{ i }}
          </a-select-option>
        </template>
      </template>
    </a-select>
  </a-form-item>
</template>
<script>
export default {
  name: 'AppSelect',
  components: {},
  props: {
    value: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    allowClear: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'default',
    },
    remote: {
      type: Boolean,
      default: true,
    },
    url: {
      type: String,
      default: '',
    },
    data: {
      type: Array,
      default: () => [],
    },
    labelCol: {
      type: Object,
      default: () => {},
    },
    wrapperCol: {
      type: Object,
      default: () => {},
    },
    callBackFunc: {
      type: Function,
      default: () => 1,
    },
    name: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    defaultValue: {
      type: [String, Number, Array],
      default: () => '',
    },
  },
  data() {
    return {
      lastFetchId: 0,
      innerValue: undefined,
      dataRemote: [],
      fetching: false,
    }
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
  created() {
    if (this.value && this.value.length > 0) {
      this.innerValue = this.value
    } else {
      this.innerValue = undefined
    }
  },
  methods: {
    blurHandler(e) {
      this.$emit('blur', e)
    },
    changeHandler(e) {
      this.$emit('change', e)
    },
    searchHandler(e) {
      if (this.remote) {
        this.fetchDataHandler(e)
      }
    },
    selectHandler(e) {
      this.$emit('select', e)
    },
    fetchDataHandler(value) {
      if (this.lastFetchId > 0) {
        return
      }
      const callBackFunc = this.callBackFunc
      this.dataRemote = []
      this.fetching = true
      this.$axios
        .$get(this.url)
        .then((body) => {
          if (body.response && Array.isArray(body.response)) {
            const dataRemote = body.response.map(callBackFunc)
            this.$nextTick(() => {
              this.dataRemote = dataRemote
            })
          } else if (!body.response) {
            const dataRemote = body.map(callBackFunc)
            this.$nextTick(() => {
              this.dataRemote = dataRemote
            })
            // this.dataRemote = dataRemote
          } else {
            const dataRemote = body.response.content.map(callBackFunc)
            this.$nextTick(() => {
              this.dataRemote = dataRemote
            })
            this.dataRemote = dataRemote
          }
          this.fetching = false
          this.lastFetchId += 1
        })
        .catch((err) => {
          this.fetching = false
          let errorMessage = 'Network Error'

          // Error Message from Backend
          // eslint-disable-next-line no-prototype-builtins
          if (err.hasOwnProperty('response')) {
            const res = err.response
            errorMessage = res.data.errorMessage

            this.$notification.error({
              message: 'Error Message',
              description: errorMessage,
              duration: 4000,
            })
          }
        })
    },
  },
}
</script>
<style lang="scss" scoped>
@media only screen and (min-width: 1536px) {
  @media only screen and (min-height: 730px) {
    select {
      font-size: 12px !important;
      line-height: 100%;
    }
    .full-input {
      height: 50px;
    }
    label {
      font-size: 11px !important;
    }
  }
  @media only screen and (min-height: 900px) {
    select {
      font-size: 14px !important;
      line-height: 195%;
    }
    .full-input {
      height: 60px;
    }
    label {
      font-size: 13px !important;
    }
  }
}
</style>
