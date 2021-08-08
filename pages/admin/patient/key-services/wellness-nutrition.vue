<template>
  <div>
    <a-row v-if="!screenIsVisible" type="flex" :gutter="24">
      <a-col v-for="(card, j) in wellnessList" :key="j" :span="12">
        <AppDashboardCard
          :card-obj="card"
          :color="card.color"
          style="margin-bottom: 2rem"
          @click="showModalhandler(card.key)"
        />
      </a-col>
    </a-row>
    <div v-else>
      <div>
        <a @click="closeViewHandler"
          ><img src="@/assets/images/long-arrow-left.svg"
        /></a>
      </div>
      <br />
      <div>
        <AppScreeningTab />

        <br />
        <div>
          <h6>Locate Nearest Center</h6>
          <div class="admin-wrapper">
            <a-form>
              <a-row type="flex" align="bottom" :gutter="16">
                <a-col :span="8">
                  <AppInput
                    v-model="bookAppointmentObj.date"
                    label="Date of Visit"
                    placeholder="Select Date"
                    name="date of visit"
                  />
                </a-col>
                <a-col :span="8">
                  <AppInput
                    v-model="bookAppointmentObj.time"
                    label="Time of Visit"
                    placeholder="Select Time"
                    name="time of visit"
                  />
                </a-col>
                <a-col :span="8">
                  <AppButton
                    type="primary"
                    :block="false"
                    :loading="isLoading"
                    class="admin-button"
                    @click="submitHandler"
                    >BOOK</AppButton
                  >
                </a-col>
              </a-row>
            </a-form>
          </div>
        </div>
      </div>
    </div>
    <a-modal
      :visible="modalIsVisible"
      width="500px"
      :confirm-loading="confirmLoading"
      :footer="null"
      :destroy-on-close="true"
      :mask-style="{ background: 'rgba(61, 12, 60, 0.9)' }"
      centered
      @cancel="closeModal"
    >
      <div>
        <h6 class="t-c">{{ modalTitle }}</h6>
        <a-divider />
        <div>
          <AppScreeningForm
            v-if="wellnessKey === 'screening'"
            @showScreeningPage="showScreeningPage"
          />
          <AppNutritionForm v-if="wellnessKey === 'nutritionist'" />
          <AppDentistForm v-if="wellnessKey === 'dentist'" />
          <AppOpticalForm v-if="wellnessKey === 'optical'" />
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script>
import AppDashboardCard from '@/components/AppDashboardCard'
import AppNutritionForm from '@/components/admin/patient/key-service/wellness-nutrition/AppNutritionForm'
import AppDentistForm from '@/components/admin/patient/key-service/wellness-nutrition/AppDentistForm'
import AppOpticalForm from '@/components/admin/patient/key-service/wellness-nutrition/AppOpticalForm'
import AppScreeningTab from '@/components/admin/patient/key-service/wellness-nutrition/AppScreeningTab'
import AppScreeningForm from '@/components/admin/patient/key-service/wellness-nutrition/AppScreeningForm'
import AppInput from '@/components/AppInput'
import AppButton from '@/components/AppButton'

export default {
  components: {
    AppDashboardCard,
    AppNutritionForm,
    AppDentistForm,
    AppOpticalForm,
    AppScreeningTab,
    AppInput,
    AppButton,
    AppScreeningForm,
  },
  layout: 'dashboard',
  data() {
    return {
      modalIsVisible: false,
      screenIsVisible: false,
      confirmLoading: false,
      wellnessKey: false,
      isLoading: false,
      bookAppointmentObj: {},
      screeningFrequency: '',
      wellnessList: [
        {
          key: 'screening',
          firstText: 'Request annual',
          secondText: 'MEDICAL SCREENING',
          imgSrc: 'admin/patient/2.png',
          color: '#641C62',
        },
        {
          key: 'nutritionist',
          firstText: 'Talk to a',
          secondText: 'NUTRITIONIST',
          imgSrc: 'admin/patient/2.png',
          color: '#BB58B6',
        },
        {
          key: 'dentist',
          firstText: 'Request a',
          secondText: 'DENTIST',
          imgSrc: 'admin/patient/2.png',
          color: '#BB58B6',
        },
        {
          key: 'optical',
          firstText: 'Request an',
          secondText: 'OPTICAL SERVICE',
          imgSrc: 'admin/patient/2.png',
          color: '#641C62',
        },
      ],
    }
  },
  computed: {
    modalTitle() {
      if (this.wellnessKey === 'screening') {
        return 'Medical Screening'
      }
      if (this.wellnessKey === 'nutritionist') {
        return 'Talk to a Nutritionist'
      }
      if (this.wellnessKey === 'dentist') {
        return 'Request a Dentist'
      }
      return 'Request an Optical Service'
    },
  },
  methods: {
    showModalhandler(key) {
      this.modalIsVisible = true
      this.wellnessKey = key
    },
    showScreeningPage(frequency) {
      this.modalIsVisible = false
      this.screenIsVisible = true
      this.screeningFrequency = frequency
    },
    closeModal() {
      this.modalIsVisible = false
    },
    closeViewHandler() {
      this.screenIsVisible = false
    },
    submitHandler() {
      console.log('CLICKED')
    },
  },
}
</script>
<style lang="scss" scoped>
h6 {
  color: $dark-purple;
}
</style>
