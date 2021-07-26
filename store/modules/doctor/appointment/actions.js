import { GET_APPOINTMENT } from '@/utils/mutation-types/doctor/appointment'
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
}
