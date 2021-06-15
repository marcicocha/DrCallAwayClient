<template>
  <div>
    <div v-if="!caseIsVisible">
      <AppTabs v-model="activeKey">
        <template slot="default">
          <a-tab-pane key="1" tab="Available Patients" force-render>
            <div class="admin-wrapper">
              <AppPatientCard
                v-for="(card, i) in patientList"
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
                v-for="(card, i) in patientList"
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
      <AppTitleDivider :title="`Case File / ${currentCaseFile.caseId}`"
        ><span class="right-details"
          ><span style="color: $dark-purple">Status:</span>
          <span
            :class="{
              blue: currentCaseFile.status === 'Active',
              green: currentCaseFile.status === 'Completed',
              red: currentCaseFile.status === 'Pending',
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
        <AppHealthInformationForm />
      </div>
    </a-modal>
  </div>
</template>
<script>
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
      patientList: [
        {
          id: 1,
          patientName: 'Abraham Lincoln',
          issueDescription:
            'I feel a strong headache every now and then. I also find it difficult to eat',
          dateAdded: '04/04/2021 8:54 AM',
          ailment: 'Headache',
        },
        {
          id: 2,
          patientName: 'Muhammadu Buhari',
          issueDescription:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
          dateAdded: '04/04/2021 8:54 AM',
          ailment: 'Food Poisoning',
        },
      ],
    }
  },
  methods: {
    checkInHandler(record) {
      this.caseIsVisible = true
      this.currentCaseFile = record
    },
    medicalInfoHandler(record) {
      this.modalIsVisible = true
    },
    closeModal() {
      this.modalIsVisible = false
    },
    closeViewHandler() {
      this.caseIsVisible = false
    },
  },
}
</script>
<style lang="scss" scoped>
.right-info {
  width: 15%;
}
</style>
