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
          <a-form>
            <a-row type="flex" align="middle" :gutter="16" class="t-c">
              <a-col :span="16">
                <div class="admin-wrapper">
                  <ValidationObserver ref="observer" tag="div">
                    <a-row type="flex" align="bottom" :gutter="16">
                      <a-col :span="12">
                        <AppSelect
                          v-model="nearestDiagnosticObj.state"
                          label="State"
                          placeholder="State"
                          name="state"
                          url="/states"
                          :call-back-func="
                            (resp) => ({
                              text: resp,
                              value: resp,
                            })
                          "
                          @change="selectStateHandler"
                        />
                      </a-col>
                      <a-col :span="12">
                        <AppSelect
                          :key="counter"
                          v-model="nearestDiagnosticObj.lga"
                          label="LGA"
                          placeholder="Select LGA"
                          name="LGA"
                          :url="`/lgas/${nearestDiagnosticObj.state}`"
                          :call-back-func="
                            (resp) => ({
                              text: resp,
                              value: resp,
                            })
                          "
                          @change="selectLgaHandler"
                        />
                      </a-col>
                      <a-col :span="24">
                        <AppSelect
                          :key="lgaCounter"
                          v-model="nearestDiagnosticObj.diagnosticCenter"
                          label="Select a Diagnostic Center"
                          placeholder="Select Diagnostic Center"
                          name="Diagnostic Center"
                          :url="`/list/diagnostic?state=${nearestDiagnosticObj.state}&lga=${nearestDiagnosticObj.lga}`"
                          :call-back-func="
                            (resp) => ({
                              text: resp,
                              value: resp,
                            })
                          "
                        />
                      </a-col>
                    </a-row>
                  </ValidationObserver>
                </div>
              </a-col>
              <a-col :span="8">
                <p>Selected Diagnostic Center</p>
                <p style="text-transform: uppercase">
                  {{ nearestDiagnosticObj.diagnosticCenter }}
                </p>
                <AppButton
                  type="primary"
                  :block="false"
                  :loading="isLoading"
                  class="admin-button"
                  @click="submitHandler"
                  >PROCEED</AppButton
                >
                <p class="error">
                  By clicking “PROCEED” you are giving your consent.
                </p>
              </a-col>
            </a-row>
          </a-form>
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
import { ValidationObserver } from 'vee-validate'
import AppDashboardCard from '@/components/AppDashboardCard'
import AppNutritionForm from '@/components/admin/patient/key-service/wellness-nutrition/AppNutritionForm'
import AppDentistForm from '@/components/admin/patient/key-service/wellness-nutrition/AppDentistForm'
import AppOpticalForm from '@/components/admin/patient/key-service/wellness-nutrition/AppOpticalForm'
import AppScreeningTab from '@/components/admin/patient/key-service/wellness-nutrition/AppScreeningTab'
import AppScreeningForm from '@/components/admin/patient/key-service/wellness-nutrition/AppScreeningForm'
import AppSelect from '@/components/AppSelect'
import AppButton from '@/components/AppButton'

export default {
  components: {
    AppDashboardCard,
    AppNutritionForm,
    AppDentistForm,
    AppOpticalForm,
    AppScreeningTab,
    AppSelect,
    AppButton,
    AppScreeningForm,
    ValidationObserver,
  },
  layout: 'dashboard',
  data() {
    return {
      modalIsVisible: false,
      screenIsVisible: false,
      confirmLoading: false,
      wellnessKey: false,
      isLoading: false,
      screeningFrequency: '',
      counter: 0,
      lgaCounter: 0,
      nearestDiagnosticObj: {},
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
    selectStateHandler() {
      this.counter++
      this.nearestDiagnosticObj.lga = undefined
      this.nearestDiagnosticObj.diagnosticCenter = undefined
    },
    selectLgaHandler() {
      this.lgaCounter++
      this.nearestDiagnosticObj.diagnosticCenter = undefined
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
    async submitHandler() {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      console.log('CLICKED')
    },
  },
}
</script>
<style lang="scss" scoped>
h6 {
  color: $dark-purple;
}
.error {
  color: #f04519;
  font-weight: 400;
  margin-top: 0.8rem;
}
p {
  color: $dark-purple;
  font-weight: bold;
}
</style>
