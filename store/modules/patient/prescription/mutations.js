import { GET_PRESCRIPTION } from '@/utils/mutation-types/patient/prescription'

export default {
  [GET_PRESCRIPTION](state, payload) {
    state.prescriptions = payload
  },
}
