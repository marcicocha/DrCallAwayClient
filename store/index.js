import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

import caseFileModule from './modules/patient/caseFile'
import appointmentModule from './modules/patient/appointment'
import ambulanceModule from './modules/patient/ambulance'
import healthInformationModule from './modules/patient/healthInformation'
const createStore = () => {
  return new Vuex.Store({
    state: () => ({}),
    getters,
    mutations,
    actions,
    modules: {
      caseFileModule,
      appointmentModule,
      ambulanceModule,
      healthInformationModule,
    },
  })
}
export default createStore
