import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

import caseFileModule from './modules/patient/caseFile'
import caseFileDoctorModule from './modules/doctor/caseFile'
import appointmentModule from './modules/patient/appointment'
import ambulanceModule from './modules/patient/ambulance'
import healthInformationModule from './modules/patient/healthInformation'
import subscriptionModule from './modules/patient/subscription'
import testsModule from './modules/patient/tests'
import prescriptionModule from './modules/patient/prescription'
import waitingRoomModule from './modules/doctor/waitingRoom'
const createStore = () => {
  return new Vuex.Store({
    state: () => ({}),
    getters,
    mutations,
    actions,
    modules: {
      caseFileModule,
      caseFileDoctorModule,
      appointmentModule,
      ambulanceModule,
      healthInformationModule,
      subscriptionModule,
      testsModule,
      prescriptionModule,
      waitingRoomModule,
    },
  })
}
export default createStore
