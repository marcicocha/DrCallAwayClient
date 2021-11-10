import {
  GET_APPOINTMENT,
  BOOK_APPOINTMENT,
  BOOK_NURSE,
  RESET_APPOINTMENT,
  MOVE_TO_BOOKED_APPOINTMENT,
} from '@/utils/mutation-types/patient/appointment'

export default {
  [GET_APPOINTMENT](state, payload) {
    state.appointments = payload
  },
  [BOOK_APPOINTMENT](state, payload) {
    // state.appointments.unshift(payload)
  },
  [BOOK_NURSE](state, payload) {
    // state.appointments.unshift(payload)
  },
  [RESET_APPOINTMENT](state) {
    state.appointments = []
    state.moveToBooked = false
  },
  [MOVE_TO_BOOKED_APPOINTMENT](state) {
    state.moveToBooked = true
  },
}
