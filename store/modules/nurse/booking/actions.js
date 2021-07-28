import { GET_BOOKING } from '@/utils/mutation-types/nurse/booking'
export default {
  async [GET_BOOKING]({ commit }, payload) {
    const user = JSON.parse(localStorage.getItem('user'))
    const config = {
      headers: { Authorization: `Bearer ${user.token.token}` },
      params: {
        ...payload,
      },
    }
    const { data } = await this.$axios.$get('nurse/bookings', config)
    commit(GET_BOOKING, data)
  },
}
