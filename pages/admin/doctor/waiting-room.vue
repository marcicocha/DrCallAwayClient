<template>
  <div>
    <div v-if="!caseIsVisible">
      <AppTabs v-model="activeKey" @tabClick="changeTabHandler">
        <template slot="default">
          <a-tab-pane key="1" tab="Available Patients" force-render>
            <div class="admin-wrapper">
              <AppPatientCard
                v-for="(card, i) in generalWaitingRoom"
                :key="i"
                :card-obj="card"
                @medicalInfoHandler="medicalInfoHandler"
                @checkInHandler="checkInHandler"
              />
            </div>
          </a-tab-pane>
          <a-tab-pane key="2" tab="Specialist Requests">
            <div class="admin-wrapper">
              <AppPatientCard
                v-for="(card, i) in specialistWaitingRoom"
                :key="i"
                :card-obj="card"
                @medicalInfoHandler="medicalInfoHandler"
                @checkInHandler="checkInHandler"
              />
            </div>
          </a-tab-pane>
        </template>
        <template slot="rightInfo">
          <AppInput
            v-model="filterObj.filterValue"
            placeholder="Search"
            class="filter right-info"
            name="value"
          />
        </template>
      </AppTabs>
    </div>
    <div v-else>
      <div>
        <a @click="closeViewHandler"
          ><img src="@/assets/images/long-arrow-left.svg"
        /></a>
      </div>
      <br />
      <AppTitleDivider :title="`Case File / ${currentCaseFile.case_id}`"
        ><span class="right-details"
          ><span style="color: $dark-purple">Status:</span>
          <span
            :class="{
              blue: currentCaseFile.status === 'ACTIVE',
              green: currentCaseFile.status === 'COMPLETED',
              red: currentCaseFile.status === 'PENDING',
            }"
            >{{ currentCaseFile.status }}</span
          ></span
        ></AppTitleDivider
      >
      <div>
        <AppCaseFileForm :current-case-file="currentCaseFile" status="doctor" />
      </div>
    </div>
    <a-modal
      :visible="modalIsVisible"
      width="900px"
      :confirm-loading="confirmLoading"
      :footer="null"
      :destroy-on-close="true"
      :mask-style="{ background: 'rgba(61, 12, 60, 0.9)' }"
      centered
      @cancel="closeModal"
    >
      <div>
        <AppHealthInformationForm :health-info-obj="healthInfo" mode="doctor" />
      </div>
    </a-modal>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import AppInput from '@/components/AppInput'
import AppPatientCard from '@/components/admin/doctor/AppPatientCard'
import AppHealthInformationForm from '@/components/admin/AppHealthInformationForm'
import AppCaseFileForm from '@/components/admin/patient/case-file/AppCaseFileForm'
export default {
  components: {
    AppInput,
    AppPatientCard,
    AppHealthInformationForm,
    AppCaseFileForm,
  },
  layout: 'dashboard',
  data() {
    return {
      activeKey: '1',
      filterObj: {},
      caseIsVisible: false,
      modalIsVisible: false,
      confirmLoading: false,
      currentCaseFile: {},
    }
  },
  computed: {
    ...mapState({
      generalWaitingRoom: (state) => state.waitingRoomModule.generalWaitingList,
      specialistWaitingRoom: (state) =>
        state.waitingRoomModule.specialistWaitingList,
      healthInfo: (state) => state.waitingRoomModule.healthInfoObj,
    }),
  },
  mounted() {
    this.changeTabHandler('1')
  },
  methods: {
    checkInHandler(record) {
      this.currentCaseFile = record
      const $this = this
      this.$confirm({
        title: 'Are you sure you want to accept this Case File?',
        content: `With ID: ${record.id}`,
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        async onOk() {
          // vm.showModal(false)
          try {
            await $this.$store.dispatch(
              'caseFileDoctorModule/ACCEPT_CASE_FILE',
              record.id
            )
            $this.$notification.success({
              message: 'Success',
              description: 'Check in Successful',
            })
            $this.caseIsVisible = true
          } catch (e) {
            const { default: errorHandler } = await import(
              '@/utils/errorHandler'
            )
            errorHandler(e).forEach((msg) => {
              $this.$notification.error({
                message: 'Error',
                description: msg,
              })
            })
          }
        },
        onCancel() {},
      })
    },
    async medicalInfoHandler(record) {
      try {
        await this.$store.dispatch(
          'waitingRoomModule/GET_HEALTH_INFORMATION',
          record.patient_id
        )
        this.modalIsVisible = true
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
    closeModal() {
      this.modalIsVisible = false
    },
    closeViewHandler() {
      this.caseIsVisible = false
    },
    async changeTabHandler(key) {
      try {
        const obj = {
          ...this.filterObj,
        }
        if (key === '1') {
          await this.getGeneralWaitingRoom(obj)
        }
        if (key === '2') {
          await this.getSpecialistWaitingRoom(obj)
        }
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
    ...mapActions({
      getGeneralWaitingRoom: 'waitingRoomModule/GET_GENERAL_WAITING_ROOM',
      getSpecialistWaitingRoom: 'waitingRoomModule/GET_SPECIALIST_WAITING_ROOM',
    }),
  },
}
</script>
<style lang="scss" scoped>
.right-info {
  width: 15%;
}
</style>
