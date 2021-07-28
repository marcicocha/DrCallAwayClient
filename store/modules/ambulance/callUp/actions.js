import { GET_CALL_UP } from '@/utils/mutation-types/ambulance/call-up'
export default {
  async [GET_CALL_UP]({ commit }, payload) {
    const user = JSON.parse(localStorage.getItem('user'))
    const config = {
      headers: { Authorization: `Bearer ${user.token.token}` },
      params: {
        ...payload,
      },
    }
    const { data } = await this.$axios.$get('ambulance/callups', config)
    commit(GET_CALL_UP, data)
  },
}
