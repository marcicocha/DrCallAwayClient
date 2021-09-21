<template>
  <div>
    <div v-if="caseFileObj.doctor" class="doctor__container">
      <div class="doctor__container-img">
        <img src="" alt="doctor" />
      </div>
      <div class="doctor__container-text">
        <h6>
          {{
            status === 'patient'
              ? `${caseFileObj.doctor.first_name} ${caseFileObj.doctor.last_name}`
              : `${caseFileObj.patient.first_name} ${caseFileObj.patient.last_name}`
          }}
        </h6>
        <p>
          {{ status === 'patient' ? 'Medical Doctor' : 'Patient' }}
        </p>
        <div class="flex image_container">
          <a @click="showChatHandler"
            ><img src="@/assets/images/admin/message.png" alt="message"
          /></a>
          <a @click="showVideoHandler('audio')"
            ><img src="@/assets/images/admin/call.png" alt="call"
          /></a>
          <a @click="showVideoHandler('video')"
            ><img src="@/assets/images/admin/video.png" alt="video"
          /></a>
        </div>
      </div>
    </div>
    <a-form>
      <ValidationObserver ref="observer" tag="div">
        <a-row type="flex" :gutter="24">
          <a-col :span="12">
            <AppDatePicker
              v-model="caseFileObj.created_at"
              label="Date Created"
              name="date created"
              :disabled="status === 'patient'"
            />
          </a-col>
          <a-col :span="12">
            <AppInput
              v-model="caseFileObj.initial_complain"
              label="Complaint"
              name="Complaint"
              :disabled="status === 'patient'"
            />
          </a-col>
          <a-col :span="24">
            <AppInput
              v-model="caseFileObj.doctor_observation"
              label="Doctor's Comment"
              name="Doctor Comment"
              :disabled="status === 'patient'"
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
          :data-source="prescriptionList"
          :pagination="false"
          :row-key="(record) => record.id"
        >
        </a-table>
        <br />
        <div class="flex flex-jc-sb">
          <p>
            {{
              caseFileObj.pharmacy
                ? `Selected Pharmacy: ${caseFileObj.pharmacy.address}`
                : ''
            }}
          </p>
          <AppButton
            v-if="status === 'doctor'"
            type="primary"
            icon="plus"
            :block="false"
            class="admin-button"
            @click="addHandler('prescription')"
            >Add New Prescription</AppButton
          >
        </div>
      </div>
      <br />
      <div>
        <p>Test</p>

        <a-table
          :columns="testColumns"
          :data-source="testList"
          :pagination="false"
          :row-key="(record) => record.id"
        >
          <template slot="status" slot-scope="text, record">
            <div
              :class="{
                blue: record.status === 'ACTIVE',
                green: record.status === 'COMPLETED',
                red: record.status === 'PENDING',
              }"
            >
              {{ record.status }}
            </div>
          </template>
        </a-table>
        <br />
        <div class="flex flex-jc-sb">
          <p>
            {{
              caseFileObj.prescription
                ? `Selected Pharmacy: ${caseFileObj.prescription.address}`
                : ''
            }}
          </p>
          <AppButton
            v-if="status === 'doctor'"
            type="primary"
            icon="plus"
            :block="false"
            class="admin-button"
            @click="addHandler('test')"
            >Add New Test</AppButton
          >
        </div>
      </div>
    </div>
    <a-modal
      :visible="prescriptionIsVisible"
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
          {{ `Prescription for ${caseFileObj.initial_complain}` }}
        </h6>
        <a-divider />
        <div>
          <AppPrescriptionForm
            :case-file-obj="caseFileObj"
            @formSubmissionCompleted="closeModal"
          />
        </div>
      </div>
    </a-modal>
    <a-modal
      :visible="videoModalIsVisible"
      width="800px"
      :confirm-loading="confirmLoading"
      :footer="null"
      :destroy-on-close="true"
      :mask-style="{ background: 'rgba(61, 12, 60, 0.9)' }"
      centered
      @cancel="onClose"
    >
      <AppVideoAudio :current-case-file="caseFileObj" :camera="camera" />
    </a-modal>
    <AppChatDrawer
      :doctor="doctor"
      :current-case-file="caseFileObj"
      :chat-drawer-is-visible="chatDrawerIsVisible"
      @onClose="onClose"
    />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { ValidationObserver } from 'vee-validate'
import AppInput from '@/components/AppInput'
import AppDatePicker from '@/components/AppDatePicker'
import AppButton from '@/components/AppButton'
import AppPrescriptionForm from '@/components/admin/patient/case-file/AppPrescriptionForm'
import AppChatDrawer from '@/components/AppChatDrawer'
import AppVideoAudio from '@/components/AppVideoAudio2.vue'
export default {
  name: 'AppCaseFileForm',
  components: {
    ValidationObserver,
    AppInput,
    AppButton,
    AppPrescriptionForm,
    AppDatePicker,
    AppChatDrawer,
    AppVideoAudio,
  },
  props: {
    currentCaseFile: {
      type: Object,
      default: () => {},
    },
    status: {
      type: String,
      default: 'patient',
    },
  },
  data() {
    return {
      caseFileObj: {},
      prescriptionIsVisible: false,
      confirmLoading: false,
      chatDrawerIsVisible: false,
      videoModalIsVisible: false,
      camera: false,
    }
  },
  computed: {
    isReadOnly() {
      return this.caseFileObj.status !== 'BOOKED'
    },
    doctor() {
      if (this.status === 'patient') {
        if (this.caseFileObj.doctor) {
          return `${this.caseFileObj.doctor.first_name} ${this.caseFileObj.doctor.last_name}`
        }
      }
      if (this.status === 'doctor') {
        if (this.caseFileObj.patient) {
          return `${this.currentCaseFile.patient.first_name} ${this.currentCaseFile.patient.last_name}`
        }
      }
      return ''
    },
    prescriptionColumns() {
      const columns = [
        {
          title: 'Name Of Drug',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' },
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
        // {
        //   title: 'Cost',
        //   dataIndex: 'cost',
        //   scopedSlots: { customRender: 'cost' },
        // },
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
    prescriptionList() {
      let array = []
      if (this.caseFileObj.prescription !== null) {
        array = [...array, ...this.caseFileObj.prescription.drugs]
      }
      if (this.allPrescription.length !== 0) {
        array = [...array, ...this.allPrescription]
      }
      return array
    },
    testList() {
      return []
    },
    ...mapState({
      allPrescription: (state) => state.caseFileDoctorModule.prescriptionList,
      allTest: (state) => state.caseFileDoctorModule.testList,
    }),
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
    addHandler(key) {
      if (key === 'prescription') {
        this.prescriptionIsVisible = true
      } else {
        this.$emit('showTestTab')
      }
    },
    closeModal() {
      this.prescriptionIsVisible = false
    },
    showChatHandler() {
      this.chatDrawerIsVisible = true
    },
    showVideoHandler(key) {
      this.videoModalIsVisible = true
      if (key === 'audio') {
        this.camera = false
        return
      }
      this.camera = true
    },
    onClose() {
      this.chatDrawerIsVisible = false
      this.videoModalIsVisible = false
    },
  },
}
</script>
<style lang="scss" scoped>
h6 {
  color: $dark-purple;
}
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
      margin-bottom: 0.1rem;
      color: $dark-purple;
      font-size: 1.5rem;
    }
    p {
      color: $purple;
      font-weight: 600;
      font-size: 0.875rem;
    }
    .image_container {
      display: flex;
      img {
        margin-right: 1rem;
      }
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
