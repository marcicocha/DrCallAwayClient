import { GET_ALL_PRESCRIPTION } from '@/utils/mutation-types/pharmacy/prescription'

export default {
  [GET_ALL_PRESCRIPTION](state, payload) {
    state.prescriptions = payload
  },
}
