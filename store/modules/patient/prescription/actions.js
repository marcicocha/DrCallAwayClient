import { GET_PRESCRIPTION } from '@/utils/mutation-types/patient/prescription'
export default {
  async [GET_PRESCRIPTION]({ commit }, payload) {
    const user = JSON.parse(localStorage.getItem('user'))
    const config = {
      headers: { Authorization: `Bearer ${user.token.token}` },
      params: {
        ...payload,
      },
    }
    const { data } = await this.$axios.$get('prescription', config)
    commit(GET_PRESCRIPTION, data)
  },
}
