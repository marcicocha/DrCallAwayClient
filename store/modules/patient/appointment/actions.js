import {
  GET_APPOINTMENT,
  BOOK_APPOINTMENT,
} from '@/utils/mutation-types/patient/appointment'
export default {
  async [GET_APPOINTMENT]({ commit }, payload) {
    const user = JSON.parse(localStorage.getItem('user'))
    const config = {
      headers: { Authorization: `Bearer ${user.token.token}` },
      params: {
        ...payload,
      },
    }
    const { response } = await this.$axios.$get('appointments', config)
    commit(GET_APPOINTMENT, response)
  },
  async [BOOK_APPOINTMENT]({ commit }, payload) {
    const user = JSON.parse(localStorage.getItem('user'))
    const config = {
      headers: { Authorization: `Bearer ${user.token.token}` },
    }
    const { response } = await this.$axios.$post(
      'appointments',
      payload,
      config
    )
    commit(BOOK_APPOINTMENT, response)
  },
}
