import {
  GET_AMBULANCE,
  ADD_AMBULANCE,
} from '@/utils/mutation-types/patient/ambulance'

export default {
  [GET_AMBULANCE](state, payload) {
    state.ambulance = payload
  },
  [ADD_AMBULANCE](state, payload) {
    state.ambulance.unshift(payload)
  },
}
