<template>
  <div class="paginationCover">
    <a-pagination
      show-size-changer
      :page-size-options="pageSizeOptions"
      :default-current="defaultCurrent"
      :total="totalComputed"
      :disabled="disabled"
      @change="paginationChangeHandler"
      @showSizeChange="onShowSizeChange"
    />
  </div>
</template>
<script>
export default {
  name: 'AppPagination',
  props: {
    pageSizeOptions: {
      type: Array,
      default: () => ['10', '20', '30', '40', '50'],
    },
    defaultCurrent: {
      type: Number,
      default: 0,
    },
    current: {
      type: Number,
      default: 0,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    defaultPageSize: {
      type: Number,
      default: 10,
    },
    total: {
      type: [Number, String],
      default: 0,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    totalComputed() {
      return parseInt(this.total)
    },
    pageSizeComputed() {
      return parseInt(this.pageSize)
    },
    currentComputed() {
      return parseInt(this.current)
    },
  },
  methods: {
    paginationChangeHandler(pageNumber, pageSize) {
      this.$emit('change', pageNumber, pageSize)
    },
    onShowSizeChange(current, pageSize) {
      this.$emit('showSizeChange', current, pageSize)
    },
  },
}
</script>
