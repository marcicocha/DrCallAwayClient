import { GET_ALL_PRESCRIPTION } from '@/utils/mutation-types/pharmacy/prescription'
export default {
  async [GET_ALL_PRESCRIPTION]({ commit }, payload) {
    const user = JSON.parse(localStorage.getItem('user'))
    const config = {
      headers: { Authorization: `Bearer ${user.token.token}` },
      params: {
        ...payload,
      },
    }
    const { data } = await this.$axios.$get('pharmacy/prescriptions', config)
    commit(GET_ALL_PRESCRIPTION, data)
  },
}
