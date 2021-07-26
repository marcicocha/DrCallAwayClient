import { GET_APPOINTMENT } from '@/utils/mutation-types/doctor/appointment'

export default {
  [GET_APPOINTMENT](state, payload) {
    state.appointments = payload.data
  },
}
