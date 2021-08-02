import { GET_ALL_PRESCRIPTION } from '@/utils/mutation-types/ambulance/call-up'

export default {
  [GET_ALL_PRESCRIPTION](state, payload) {
    state.prescriptions = payload.data
  },
}
