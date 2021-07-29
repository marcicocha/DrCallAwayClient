import { GET_BOOKING } from '@/utils/mutation-types/nurse/booking'

export default {
  [GET_BOOKING](state, payload) {
    state.bookingList = payload
  },
}
