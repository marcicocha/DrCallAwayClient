<template>
  <div>
    <div>
      <a-form>
        <ValidationObserver ref="observer" tag="div">
          <a-row type="flex" :gutter="24">
            <a-col :span="12">
              <AppSelect
                v-model="addressObj.state"
                placeholder="Select State"
                name="state"
                url="/states"
                :call-back-func="
                  (resp) => ({
                    text: resp,
                    value: resp,
                  })
                "
                rules="required"
                required
                @change="selectStateHandler"
              />
            </a-col>
            <a-col :span="12">
              <AppSelect
                :key="counter"
                v-model="addressObj.city"
                placeholder="Select LGA"
                name="LGA"
                :url="`/lgas/${addressObj.state}`"
                :call-back-func="
                  (resp) => ({
                    text: resp,
                    value: resp,
                  })
                "
                rules="required"
                required
                :disabled="!addressObj.state"
                @change="selectCityHandler"
              />
            </a-col>
          </a-row>
        </ValidationObserver>
      </a-form>
    </div>
    <br />
    <div v-if="cityIsSelected" class="colored-table">
      <a-table
        :columns="columns"
        :data-source="dataSource"
        :pagination="false"
        :row-key="(record) => record.id"
      >
        <template slot="sn" slot-scope="text, record, index">
          {{ index + 1 }}
        </template>
        <template slot="select" slot-scope="text, record">
          <AppButton
            type="primary"
            :block="false"
            class="admin-button dark-button"
            @click="selectHandler(record)"
            >SELECT</AppButton
          >
        </template>
      </a-table>
      <a-modal
        :visible="selectedDiagnosticModalIsVisible"
        width="600px"
        :footer="null"
        :destroy-on-close="true"
        :mask-style="{ background: 'rgba(61, 12, 60, 0.9)' }"
        centered
        @cancel="closeModal"
      >
        <div>
          <h6 class="t-c">
            Selected Diagnostic Center:
            {{
              `${selectedDiagnosticObj.registered_name} (${selectedDiagnosticObj.address})`
            }}
          </h6>
          <a-divider />
          <AppSelectedDiagnostic
            :test-list="testList"
            :selectedDiagnosticObj="selectedDiagnosticObj"
            :currentTestObj="currentTestObj"
            @closeModal="onClose"
          />
        </div>
      </a-modal>
    </div>
  </div>
</template>
<script>
import { ValidationObserver } from 'vee-validate'
import AppButton from '@/components/AppButton'
import AppSelectedDiagnostic from '@/components/admin/patient/precription-test/test/AppSelectedDiagnostic'
import AppSelect from '@/components/AppSelect'
export default {
  name: 'AppDiagnosticTable',
  components: {
    AppButton,
    AppSelectedDiagnostic,
    AppSelect,
    ValidationObserver,
  },
  props: {
    testList: {
      type: Array,
      default: () => [],
    },
    currentTestObj: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      selectedDiagnosticModalIsVisible: false,
      selectedDiagnosticObj: {},
      confirmLoading: false,
      dataSource: [],
      addressObj: {},
      counter: 0,
      cityIsSelected: false,
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
          title: 'NAME OF DIAGNOSTIC',
          dataIndex: 'registered_name',
          scopedSlots: { customRender: 'registered_name' },
        },
        {
          title: 'ADDRESS',
          dataIndex: 'address',
          scopedSlots: { customRender: 'address' },
        },
        {
          title: 'SELECT',
          dataIndex: 'select',
          scopedSlots: { customRender: 'select' },
          width: '15%',
        },
      ]
      return columns
    },
  },
  methods: {
    selectHandler(record) {
      this.selectedDiagnosticObj = record
      this.selectedDiagnosticModalIsVisible = true
    },
    closeModal() {
      this.selectedDiagnosticModalIsVisible = false
    },
    selectStateHandler() {
      this.counter++
      this.addressObj.city = undefined
    },
    async selectCityHandler(e) {
      try {
        const user = JSON.parse(localStorage.getItem('user'))
        const config = {
          headers: { Authorization: `Bearer ${user.token.token}` },
        }
        const { data } = await this.$axios.$get(
          `/list/diagnostic?state=${this.addressObj.state}&lga=${e}`,
          config
        )
        this.dataSource = data
        this.cityIsSelected = true
      } catch (err) {
        const { default: errorHandler } = await import('@/utils/errorHandler')
        errorHandler(err).forEach((msg) => {
          this.$notification.error({
            message: 'Error',
            description: msg,
            duration: 4000,
          })
        })
      }
    },
    onClose() {
      this.$emit('onClose')
      this.closeModal()
    },
  },
}
</script>
<style lang="scss" scoped>
.dark-button {
  background: $medium-purple !important;
  font-size: 14px;
  padding: 0 2rem;
}
h6 {
  color: $dark-purple;
}
</style>
