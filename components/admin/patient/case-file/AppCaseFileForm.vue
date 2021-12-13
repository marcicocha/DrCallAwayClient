<template>
  <div>
    <div v-if="caseFileObj.status === 'ACTIVE'" class="doctor__container">
      <div class="doctor__container-img">
        <img :src="imgLink" alt="doctor" />
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
              disabled
            />
          </a-col>
          <a-col :span="12">
            <AppInput
              v-model="caseFileObj.initial_complain"
              label="Complaint"
              name="Complaint"
              disabled
            />
          </a-col>
          <a-col v-if="status === 'patient'" :span="24">
            <AppInput
              v-model="caseFileObj.doctor_observation"
              label="Doctor's Comment"
              name="Doctor Comment"
              disabled
            />
          </a-col>
          <a-col v-if="status === 'doctor'" :span="24">
            <AppSearch
              v-model="caseFileObj.doctor_observation"
              label="Doctor's Comment"
              name="Doctor Comment"
              :disabled="caseFileObj.status === 'COMPLETED'"
              @search="saveHandler"
            >
              <!-- <template>
                <a-button slot="enterButton"
                  ><img src="@/assets/images/admin/save.png" alt="img"
                /></a-button>
              </template> -->
            </AppSearch>
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
              caseFileObj.prescription
                ? caseFileObj.prescription.partners.registered_name !== null
                  ? `Selected Pharmacy: ${caseFileObj.prescription.partners.registered_name}`
                  : ''
                : ''
            }}
          </p>
          <AppButton
            v-if="status === 'doctor' && caseFileObj.status === 'ACTIVE'"
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
          <template
            v-if="
              caseFileObj.diagnosis && caseFileObj.diagnosis.test_result_link
            "
            slot="footer"
          >
            <div class="flex flex-jc-sb">
              <strong class="hide-for-mobile">Test Result</strong>
              <div class="test-result__container">
                <a class="red" @click="showViewResultHandler">View</a>
                <a :href="caseFileObj.diagnosis.test_result_link" download
                  ><img src="@/assets/images/admin/download.png" alt="download"
                /></a>
              </div>
            </div>
          </template>
        </a-table>
        <br />
        <div class="flex flex-jc-sb">
          <p>
            {{
              caseFileObj.diagnosis
                ? caseFileObj.diagnosis.partners
                  ? `Selected Diagnostic Center: ${caseFileObj.diagnosis.partners.registered_name}`
                  : ''
                : ''
            }}
          </p>
          <AppButton
            v-if="status === 'doctor' && caseFileObj.status === 'ACTIVE'"
            type="primary"
            icon="plus"
            :block="false"
            class="admin-button"
            @click="addHandler('test')"
            >Add New Test</AppButton
          >
        </div>
      </div>
      <br />
      <div class="t-c">
        <AppButton
          v-if="status === 'doctor' && caseFileObj.status === 'ACTIVE'"
          type="primary"
          :block="false"
          class="admin-button"
          @click="closeCaseHandler"
          >CLOSE CASE</AppButton
        >
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
      :closable="false"
      class="video_modal"
    >
      <AppVideoAudio
        :status="status"
        :current-case-file="caseFileObj"
        :camera="camera"
        @close="onClose"
      />
    </a-modal>
    <AppChatDrawer
      v-if="caseFileObj.status !== 'PENDING'"
      :doctor="doctor"
      :status="status"
      :current-case-file="caseFileObj"
      :chat-drawer-is-visible="chatDrawerIsVisible"
      @onClose="onClose"
    />
    <a-modal
      :visible="viewResultIsVisible"
      width="900px"
      :footer="null"
      :destroy-on-close="true"
      @cancel="closeViewResultHandler"
    >
      <object
        v-if="caseFileObj.diagnosis && caseFileObj.diagnosis.test_result_link"
        :data="caseFileObj.diagnosis.test_result_link"
        type="application/pdf"
        width="100%"
      >
        <embed
          :src="caseFileObj.diagnosis.test_result_link"
          type="application/pdf"
        />
      </object>
      <!-- <iframe
        
        :src="caseFileObj.diagnosis.test_result_link"
        type="application/pdf"
        frameborder="0"
        width="100%"
      ></iframe> -->
    </a-modal>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { ValidationObserver } from 'vee-validate'
import AppInput from '@/components/AppInput'
import AppDatePicker from '@/components/AppDatePicker'
import AppButton from '@/components/AppButton'
import AppSearch from '@/components/AppSearch'
import AppPrescriptionForm from '@/components/admin/patient/case-file/AppPrescriptionForm'
import AppChatDrawer from '@/components/AppChatDrawer'
import AppVideoAudio from '@/components/AppVideoAudio.vue'
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
    AppSearch,
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
    const user = JSON.parse(localStorage.getItem('user'))
    const config = {
      headers: { Authorization: `Bearer ${user.token.token}` },
    }
    return {
      caseFileObj: {},
      prescriptionIsVisible: false,
      confirmLoading: false,
      chatDrawerIsVisible: false,
      videoModalIsVisible: false,
      camera: false,
      user,
      config,
      TIMER_ID: null,
      testArray: [],
      viewResultIsVisible: false,
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
      const columns =
        this.status === 'patient'
          ? [
              {
                title: 'Name Of Test',
                dataIndex: 'name',
                scopedSlots: { customRender: 'name' },
              },
              {
                title: 'Cost',
                dataIndex: 'price_in_minor_unit',
                scopedSlots: { customRender: 'price_in_minor_unit' },
              },
            ]
          : [
              {
                title: 'Name Of Test',
                dataIndex: 'name',
                scopedSlots: { customRender: 'name' },
                width: '85%',
              },
            ]
      return columns
    },
    prescriptionList() {
      let array = []
      if (this.allPrescription.length !== 0) {
        array = [...array, ...this.allPrescription]
        return array
      }
      if (this.caseFileObj.prescription) {
        array = [...array, ...this.caseFileObj.prescription.drugs]
      }
      return array
    },
    testList() {
      let array = []
      if (this.allTest.length !== 0) {
        array = [...array, ...this.allTest]
        return array
      }
      if (this.caseFileObj.diagnosis) {
        array = [...array, ...this.caseFileObj.diagnosis.tests]
      }

      return array
    },
    imgLink() {
      if (this.status === 'patient' && this.caseFileObj.partner) {
        return this.caseFileObj.partner.profile_pic
      } else if (
        this.status === 'doctor' &&
        this.caseFileObj.patient.profile_pic
      ) {
        return this.caseFileObj.patient.profile_pic
      }
      return ''
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
    closeViewResultHandler() {
      this.viewResultIsVisible = false
    },
    showViewResultHandler() {
      this.viewResultIsVisible = true
    },
    viewTestResult(link) {
      console.log(link, 'LINK')
    },
    downloadTestResult(link) {
      console.log(link, 'LINK')
    },
    closeModal() {
      this.prescriptionIsVisible = false
    },
    async showChatHandler() {
      try {
        this.TIMER_ID = setInterval(() => {
          this.getMessageHandler(this.currentCaseFile.id)
        }, 5000)
        this.chatDrawerIsVisible = true
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
      clearInterval(this.TIMER_ID)
    },
    async saveHandler(value) {
      if (!value) {
        this.$notification.error({
          message: 'Error',
          description: 'Comment is Empty',
          duration: 4000,
        })
        return
      }
      const obj = { comment: value }
      try {
        const response = await this.$axios.patch(
          `cases/${this.caseFileObj.id}/comment`,
          obj,
          this.config
        )
        this.$notification.success({
          message: 'Success',
          description: response.message,
          duration: 4000,
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
    closeCaseHandler() {
      const $this = this
      this.$confirm({
        title: `Are you sure you want to close this Case?`,
        content: `With ID: ${$this.caseFileObj.id}`,
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        async onOk() {
          // vm.showModal(false)
          try {
            const response = await $this.$axios.patch(
              `cases/${$this.caseFileObj.id}/close`,
              $this.caseFileObj.id,
              $this.config
            )
            $this.$notification.success({
              message: 'Success',
              description: response.message,
              duration: 4000,
            })
            $this.$emit('switchToCompleteTab')
          } catch (err) {
            $this.loading = false
            const { default: errorHandler } = await import(
              '@/utils/errorHandler'
            )
            errorHandler(err).forEach((msg) => {
              $this.$notification.error({
                message: 'Error',
                description: msg,
                duration: 4000,
              })
            })
          }
        },
        onCancel() {},
      })
    },
    ...mapActions({
      getMessageHandler: 'messageModule/GET_MESSAGE',
    }),
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
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
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
.video_modal {
  max-height: 400px;
}
</style>
