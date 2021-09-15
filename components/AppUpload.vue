<template>
  <a-form-item
    :label="label"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    :required="required"
    class="file_upload"
  >
    <a-upload
      name="file"
      @change="handleChange"
      style="width: 100%"
      supportServerRender
    >
      <a-button block> {{ inputLabel }} </a-button>
    </a-upload>
    <a
      v-if="uploadedFileName"
      :href="uploadedFileName"
      target="_blank"
      class="view_file"
      >View Previously Uploaded File</a
    >
  </a-form-item>
</template>
<script>
export default {
  name: 'AppUpload',
  props: {
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
    disabled: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    uploadedFileName: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      file: '',
    }
  },
  computed: {
    inputLabel() {
      if (this.file) {
        return this.file
      }
      return this.placeholder
    },
  },
  methods: {
    handleChange(info) {
      // if (info.file.status !== 'uploading') {
      //   console.log(info.file, info.fileList)
      // }
      if (info.file.status === 'done') {
        this.$emit('change', info.file)
        this.file = info.file.name
        // this.$message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.view_file {
  color: $dark-purple;
}
</style>
