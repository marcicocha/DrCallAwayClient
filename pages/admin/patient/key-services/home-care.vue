<template>
  <div>
    <a-row type="flex" :gutter="24">
      <a-col v-for="(card, j) in consultationCardList" :key="j" :span="12">
        <AppDashboardCard
          :card-obj="card"
          :color="card.color"
          @click="showModalhandler(card.key)"
        />
      </a-col>
    </a-row>
    <a-modal
      :visible="modalIsVisible"
      width="550px"
      :confirm-loading="confirmLoading"
      :footer="null"
      :destroy-on-close="true"
      :mask-style="{ background: 'rgba(61, 12, 60, 0.9)' }"
      centered
      @cancel="closeModal"
    >
      <div>
        <h6 class="t-c">
          {{
            homeCareKey === 'nurse'
              ? 'Request a Nurse'
              : 'Request a General Practioner'
          }}
        </h6>
        <a-divider />
        <div>
          <a-form>
            <ValidationObserver ref="observer" tag="div">
              <AppSelect
                v-if="homeCareKey === 'nurse'"
                v-model="homeCareObj.nurse"
                label="List of Nurse"
                placeholder="Select a Nurse"
                name="nurse"
                :data="['YES']"
                :remote="true"
              />
              <AppSelect
                v-if="homeCareKey === 'practitioner'"
                v-model="homeCareObj.generalPractitioner"
                label="List of General Practitioner"
                placeholder="Select a General Practitioner"
                name="nurse"
                :data="['YES']"
                :remote="true"
              />
              <AppInput
                v-model="homeCareObj.noOfDays"
                :label="`Number of Days ${
                  homeCareKey === 'nurse' ? '(N5,000/Day)' : '(N10,000/Day)'
                }`"
                name="number of Days"
                placeholder="Enter Number of Days"
                required
                rules="required"
              />
              <AppInput
                v-model="homeCareObj.address"
                label="Address"
                name="address"
                placeholder="Enter Address"
              />
              <AppInput
                v-model="homeCareObj.startDate"
                label="Select Start Date"
                name="select start date"
              />
              <AppInput
                v-model="homeCareObj.startTime"
                label="Select Start Time"
                name="select start time"
              />
              <AppInput
                v-model="homeCareObj.additionalComment"
                label="Additional Comment"
                name="additional comment"
              />
            </ValidationObserver>
            <br />
            <div class="t-c">
              <AppButton
                type="primary"
                :block="false"
                :loading="isLoading"
                class="admin-button"
                @click="submitHandler"
                >SUBMIT</AppButton
              >
            </div>
          </a-form>
        </div>
      </div>
    </a-modal>
    <a-modal
      :visible="selectedModalIsVisible"
      width="600px"
      :confirm-loading="confirmLoading"
      :footer="null"
      :destroy-on-close="true"
      :mask-style="{ background: 'rgba(61, 12, 60, 0.9)' }"
      centered
      @cancel="closeModal"
    >
      <div>
        <h6 class="t-c">
          {{
            homeCareKey === 'nurse'
              ? `Selected Nurse: ${homeCareObj.nurse}`
              : `Selected General Practitioner: ${homeCareObj.generalPractitioner}`
          }}
        </h6>
        <a-divider />
        <div class="colored-table">
          <a-table
            :columns="columns"
            :data-source="dataSource"
            :pagination="false"
            :row-key="(record) => record.id"
          ></a-table>
        </div>
        <br />
        <div>
          <a-row type="flex" :gutter="24">
            <a-col :span="8" :offset="4">
              <AppButton
                type="default"
                :loading="isLoading"
                class="admin-button"
                @click="closeModal"
                >GO BACK</AppButton
              >
            </a-col>
            <a-col :span="8">
              <AppButton
                type="primary"
                :loading="isLoading"
                class="admin-button"
                @click="closeModal"
                >MAKE PAYMENT</AppButton
              >
            </a-col>
          </a-row>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script>
import { ValidationObserver } from 'vee-validate'
import AppDashboardCard from '@/components/AppDashboardCard'
import AppInput from '@/components/AppInput'
import AppSelect from '@/components/AppSelect'

export default {
  components: {
    AppDashboardCard,
    AppInput,
    AppSelect,
    ValidationObserver,
  },
  layout: 'dashboard',
  data() {
    return {
      modalIsVisible: false,
      confirmLoading: false,
      homeCareKey: '',
      isLoading: false,
      homeCareObj: {},
      selectedModalIsVisible: false,
      dataSource: [],
      consultationCardList: [
        {
          key: 'nurse',
          firstText: 'Request a',
          secondText: 'NURSE',
          imgSrc: 'admin/patient/1.png',
          color: '#641C62',
        },
        {
          key: 'practitioner',
          firstText: 'Request a',
          secondText: 'GENERAL PRACTITIONER',
          imgSrc: 'admin/patient/2.png',
          color: '#BB58B6',
        },
      ],
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
          title: 'NAME OF SERVICE',
          dataIndex: 'nameOfService',
          scopedSlots: { customRender: 'nameOfService' },
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
    showModalhandler(key) {
      this.modalIsVisible = true
      this.homeCareKey = key
    },
    closeModal() {
      this.modalIsVisible = false
      this.selectedModalIsVisible = false
    },
    submitHandler() {
      this.selectedModalIsVisible = true
    },
  },
}
</script>
<style lang="scss" scoped>
h6 {
  color: $dark-purple;
}
</style>
