<template>
  <div>
    <div class="doctor__container">
      <div class="doctor__container-img">
        <img src="" alt="doctor" />
      </div>
      <div class="doctor__container-text">
        <h6>{{ caseFileObj.consultantName }}</h6>
        <p>{{ caseFileObj.consultantPosition }}</p>
      </div>
    </div>
    <a-form>
      <ValidationObserver ref="observer" tag="div">
        <a-row :type="flex" :gutter="24">
          <a-col :span="12">
            <AppInput
              v-model="caseFileObj.dateAdded"
              label="Date Created"
              name="date created"
            />
          </a-col>
          <a-col :span="12">
            <AppInput
              v-model="caseFileObj.complaint"
              label="Complaint"
              name="Complaint"
            />
          </a-col>
          <a-col :span="24">
            <AppInput
              v-model="caseFileObj.doctorComment"
              label="Doctor's Comment"
              name="Doctor Comment"
            />
          </a-col>
        </a-row>
      </ValidationObserver>
    </a-form>
    <br />
    <div class="table__container">
      <div>
        <p>Prescription</p>

        <a-table
          :columns="prescriptionColumns"
          :data-source="prescriptionDataSource"
          :pagination="false"
          :row-key="(record) => record.id"
        >
        </a-table>
        <p>
          {{ 'Selected Pharmacy: HealthPlus (Awolowo Road, Ikoyi, Lagos)' }}
        </p>
      </div>
      <br />
      <div>
        <p>Test</p>

        <a-table
          :columns="testColumns"
          :data-source="testDataSource"
          :pagination="false"
          :row-key="(record) => record.id"
        >
          <template slot="status" slot-scope="text, record">
            <div
              :class="{
                blue: record.status === 'Active',
                green: record.status === 'Completed',
                red: record.status === 'Pending',
              }"
            >
              {{ record.status }}
            </div>
          </template>
        </a-table>
        <p>
          {{
            'Selected Diagnostic Center: Smith Diagnostic Center (Adeola Odeku, VI, Lagos)'
          }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { ValidationObserver } from 'vee-validate'
import AppInput from '@/components/AppInput'

export default {
  name: 'AppCaseFileForm',
  components: {
    ValidationObserver,
    AppInput,
  },
  props: {
    currentCaseFile: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      caseFileObj: {},
      prescriptionDataSource: [],
      testDataSource: [],
    }
  },
  computed: {
    isReadOnly() {
      return this.caseFileObj.status !== 'Booked'
    },
    prescriptionColumns() {
      const columns = [
        {
          title: 'Name Of Drug',
          dataIndex: 'drugName',
          scopedSlots: { customRender: 'drugName' },
        },
        {
          title: 'Dosage',
          dataIndex: 'dosage',
          scopedSlots: { customRender: 'dosage' },
        },
        {
          title: 'Duration (days)',
          dataIndex: 'duration',
          scopedSlots: { customRender: 'duration' },
        },
        {
          title: 'Cost',
          dataIndex: 'cost',
          scopedSlots: { customRender: 'cost' },
        },
      ]
      return columns
    },
    testColumns() {
      const columns = [
        {
          title: 'Name Of Test',
          dataIndex: 'testName',
          scopedSlots: { customRender: 'testName' },
        },
        {
          title: 'Cost',
          dataIndex: 'cost',
          scopedSlots: { customRender: 'cost' },
        },
        {
          title: 'Action',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' },
        },
      ]
      return columns
    },
  },
  watch: {
    currentCaseFile: {
      handler(newCurrentCaseFile) {
        if (!newCurrentCaseFile) {
          this.caseFileObj = {}
        } else {
          this.caseFileObj = {
            ...newCurrentCaseFile,
          }
        }
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    submitHandler() {
      console.log('CLICKED')
    },
    getImgUrl(pic) {
      return `data:image/png;base64,${pic}`
    },
  },
}
</script>
<style lang="scss" scoped>
.doctor__container {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  &-img {
    border: 5px solid $dark-purple;
    border-radius: 5px;
    width: 11.25rem;
    height: 11.25rem;
    margin-right: 2rem;
  }
  &-text {
    h6 {
      margin-bottom: 0.2rem;
      color: $dark-purple;
    }
    p {
      color: $purple;
      font-weight: 600;
    }
  }
}
.table__container {
  p {
    color: $dark-purple;
    font-size: 14px;
    font-weight: bold;
  }
}
</style>