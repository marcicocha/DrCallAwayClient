<template>
  <div>
    <div v-if="drugs.length !== 0" class="colored-table">
      <a-table
        :columns="columns"
        :data-source="drugs"
        :pagination="false"
        :row-key="(record) => record.name"
      >
        <template slot="operation" slot-scope="text, record">
          <div style="text-align: right">
            <a-button-group class="link-group">
              <!-- <a-button
                class="table__btn"
                type="link"
                @click="editHandler(record)"
                ><a-icon type="edit"
              /></a-button> -->
              <a-button
                type="link"
                class="table__btn"
                @click="deleteHandler(record)"
                ><a-icon type="delete"
              /></a-button>
            </a-button-group>
          </div>
        </template>
      </a-table>
      <br />
    </div>
    <ValidationObserver ref="observer" tag="div">
      <a-row type="flex" :gutter="24">
        <a-col :span="8">
          <AppInput
            v-model="prescriptionObj.name"
            label="NAME OF DRUG"
            placeholder="Enter Name of Drug"
            name="name of drug"
            rules="required"
            required
          />
        </a-col>
        <a-col :span="8">
          <AppInput
            v-model="prescriptionObj.dosage"
            label="DOSAGE"
            placeholder="Enter Days"
            name="dosage"
            rules="required"
            required
          />
        </a-col>
        <a-col :span="8">
          <AppInput
            v-model="prescriptionObj.duration"
            label="DURATION (DAYS)"
            placeholder="Enter Days"
            name="duration"
            rules="required"
            required
          />
        </a-col>
      </a-row>
    </ValidationObserver>
    <br />
    <p class="t-r"><a @click="addDrugsHandler">Add More</a></p>
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
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { ValidationObserver } from 'vee-validate'
import AppInput from '@/components/AppInput'
import AppButton from '@/components/AppButton'
export default {
  name: 'AppPrescriptionForm',
  components: {
    AppInput,
    AppButton,
    ValidationObserver,
  },
  props: {
    caseFileObj: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      prescriptionObj: {},
      isLoading: false,
      drugs: [],
    }
  },
  computed: {
    columns() {
      const columns = [
        {
          title: 'NAME OF DRUG',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' },
        },
        {
          title: 'DOSAGE',
          dataIndex: 'dosage',
        },
        {
          title: 'DURATION',
          dataIndex: 'duration',
        },
        {
          title: '',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' },
        },
      ]
      return columns
    },
  },
  methods: {
    async addDrugsHandler() {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      this.drugs.push(this.prescriptionObj)
      this.prescriptionObj = {}
    },
    async submitHandler() {
      const isValid = await this.$refs.observer.validate()
      if (this.drugs.length === 0 && !isValid) {
        return
      }
      if (!isValid) {
        return
      }
      this.isLoading = true
      const newDrugs = []
      newDrugs.push(this.prescriptionObj)
      try {
        const obj = {
          case_file_id: this.caseFileObj.id,
          ailment: this.caseFileObj.initial_complain,
          diagnosis: this.caseFileObj.doctor_observation,
          drugs: [...this.drugs, ...newDrugs],
        }
        const message = await this.submitPrecriptionHandler(obj)
        this.$notification.success({
          message: 'Success',
          description: message,
          duration: 4000,
        })
        requestAnimationFrame(() => {
          this.$refs.observer.reset()
          this.isLoading = false
          this.prescriptionObj = {}
          this.$emit('formSubmissionCompleted')
        })
      } catch (err) {
        this.isLoading = false
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
    deleteHandler(record) {
      const newArray = this.drugs.filter((rcd) => record !== rcd)
      this.drugs = newArray
    },
    ...mapActions({
      submitPrecriptionHandler: 'caseFileDoctorModule/ADD_PRESCRIPTION',
    }),
  },
}
</script>
<style lang="scss" scoped>
p {
  font-weight: bold;
  a {
    color: $medium-purple;
  }
}
</style>
