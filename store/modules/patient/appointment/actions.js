import {
  GET_APPOINTMENT,
  BOOK_APPOINTMENT,
  BOOK_NURSE,
  RESET_APPOINTMENT,
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
    const { data } = await this.$axios.$get('appointments', config)
    commit(GET_APPOINTMENT, data)
  },
  async [BOOK_APPOINTMENT]({ commit }, payload) {
    const user = JSON.parse(localStorage.getItem('user'))
    const config = {
      headers: { Authorization: `Bearer ${user.token.token}` },
    }
    const { data, message } = await this.$axios.$post(
      '/appointments',
      payload,
      config
    )
    commit(BOOK_APPOINTMENT, data)
    return message
  },
  async [BOOK_NURSE]({ commit }, payload) {
    const user = JSON.parse(localStorage.getItem('user'))
    const config = {
      headers: { Authorization: `Bearer ${user.token.token}` },
    }
    const { data, message } = await this.$axios.$post(
      '/book/nurse',
      payload,
      config
    )
    commit(BOOK_NURSE, data)
    return message
  },
  [RESET_APPOINTMENT]({ commit }) {
    commit(RESET_APPOINTMENT)
  },
}
