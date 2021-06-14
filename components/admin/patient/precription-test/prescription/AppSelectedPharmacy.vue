<template>
  <div class="colored-table">
    <a-table :columns="columns" :data-source="dataSource" :pagination="false" />
    <p class="t-r"><span>TOTAL</span> <span>N2,300</span></p>
    <br />
    <div v-if="dataSource.length !== 0" class="t-c">
      <AppButton
        type="primary"
        :block="false"
        :loading="isLoading"
        class="admin-button"
        @click="submitHandler"
        >MAKE PAYMENT</AppButton
      >
    </div>
  </div>
</template>
<script>
import AppButton from '@/components/AppButton'

export default {
  name: 'AppSelectedPharmacy',
  components: {
    AppButton,
  },
  props: {
    dataSource: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isLoading: false,
    }
  },
  computed: {
    columns() {
      const columns = [
        {
          title: 'S/N',
          dataIndex: 'sn',
          scopedSlots: { customRender: 'sn' },
        },
        {
          title: 'NAME OF DRUG',
          dataIndex: 'nameOfDrug',
          scopedSlots: { customRender: 'nameOfDrug' },
        },
        {
          title: 'DOSAGE',
          dataIndex: 'dosage',
          scopedSlots: { customRender: 'dosage' },
        },
        {
          title: 'DURATION',
          dataIndex: 'duration',
          scopedSlots: { customRender: 'duration' },
        },
        {
          title: 'PRICE',
          dataIndex: 'price',
          scopedSlots: { customRender: 'price' },
        },
      ]
      return columns
    },
  },
  methods: {
    submitHandler() {
      console.log('CLICKED')
    },
  },
}
</script>
