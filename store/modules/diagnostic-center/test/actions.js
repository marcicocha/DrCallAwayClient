import { GET_TEST } from '@/utils/mutation-types/diagnostic-center/test'
export default {
  async [GET_TEST]({ commit }, payload) {
    const user = JSON.parse(localStorage.getItem('user'))
    const config = {
      headers: { Authorization: `Bearer ${user.token.token}` },
      params: {
        ...payload,
      },
    }
    const { data } = await this.$axios.$get('ambulance/callups', config)
    commit(GET_TEST, data)
  },
}
