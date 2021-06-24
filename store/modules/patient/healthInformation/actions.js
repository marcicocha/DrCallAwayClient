import { ADD_HEALTH_INFORMATION } from '@/utils/mutation-types/patient/health-information'
export default {
  async [ADD_HEALTH_INFORMATION]({ commit }, payload) {
    const user = JSON.parse(localStorage.getItem('user'))
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    }
    const { response } = await this.$axios.$post('callUp', payload, config)
    commit(ADD_HEALTH_INFORMATION, response)
  },
}
