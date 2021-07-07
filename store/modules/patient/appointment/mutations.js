import {
  GET_APPOINTMENT,
  BOOK_APPOINTMENT,
} from '@/utils/mutation-types/patient/appointment'

export default {
  [GET_APPOINTMENT](state, payload) {
    state.appointments = payload.data
  },
  [BOOK_APPOINTMENT](state, payload) {
    state.appointments.unshift(payload)
  },
}
