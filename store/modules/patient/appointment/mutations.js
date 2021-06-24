import { GET_APPOINTMENT } from '@/utils/mutation-types/patient/appointment'

export default {
  [GET_APPOINTMENT](state, payload) {
    state.appointments = payload
  },
}
