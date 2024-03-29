import { Store } from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

// PATIENT
import caseFileModule from './modules/patient/caseFile'
import appointmentModule from './modules/patient/appointment'
import ambulanceModule from './modules/patient/ambulance'
import healthInformationModule from './modules/patient/healthInformation'
import subscriptionModule from './modules/patient/subscription'
import testsModule from './modules/patient/tests'
import prescriptionModule from './modules/patient/prescription'

// DOCTOR
import waitingRoomModule from './modules/doctor/waitingRoom'
import caseFileDoctorModule from './modules/doctor/caseFile'
import appointmentDoctorModule from './modules/doctor/appointment'

// AMBULANCE
import callUpModule from './modules/ambulance/callUp'

// NURSE
import bookingModule from './modules/nurse/booking'

// PHARMACY
import prescriptionPharmacyModule from './modules/pharmacy/prescription'

// DIAGNOSTIC
import testDiagnosticModule from './modules/diagnostic-center/test'

// NUTRITIONIST
import waitingRoomNutritionistModule from './modules/nutritionist/waitingRoom'
import caseFileNutritionistModule from './modules/nutritionist/caseFile'
import appointmentNutritionistModule from './modules/nutritionist/appointment'

// MESSAGE
import messageModule from './modules/message'
const createStore = () => {
  return new Store({
    state: () => ({}),
    getters,
    mutations,
    actions,
    modules: {
      // PATIENT

      caseFileModule,
      appointmentModule,
      ambulanceModule,
      healthInformationModule,
      subscriptionModule,
      testsModule,
      prescriptionModule,

      // DOCTOR
      waitingRoomModule,
      caseFileDoctorModule,
      appointmentDoctorModule,

      // AMBULANCE
      callUpModule,

      // NURSES
      bookingModule,

      // PHARMACY
      prescriptionPharmacyModule,

      // DIAGNOSTIC
      testDiagnosticModule,

      // NUTRITIONIST
      waitingRoomNutritionistModule,
      caseFileNutritionistModule,
      appointmentNutritionistModule,

      // MESSAGE
      messageModule,
    },
  })
}
export default createStore
