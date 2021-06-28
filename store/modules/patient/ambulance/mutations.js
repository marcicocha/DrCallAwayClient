import {
  GET_AMBULANCE,
  ADD_AMBULANCE,
} from '@/utils/mutation-types/patient/ambulance'

export default {
  [GET_AMBULANCE](state, payload) {
    state.ambulances = payload
  },
  [ADD_AMBULANCE](state, payload) {
    state.ambulances.unshift(payload)
  },
}
