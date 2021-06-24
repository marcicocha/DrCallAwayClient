import { GET_APPOINTMENT } from '@/utils/mutation-types/patient/appointment'
export default {
  async [GET_APPOINTMENT]({ commit }, payload) {
    const user = JSON.parse(localStorage.getItem('user'))
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
      params: {
        ...payload,
      },
    }
    const { response } = await this.$axios.$get('appointment', config)
    commit(GET_APPOINTMENT, response)
  },
}
