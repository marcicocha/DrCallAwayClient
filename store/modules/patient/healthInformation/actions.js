import {
  ADD_HEALTH_INFORMATION,
  GET_HEALTH_INFORMATION,
} from '@/utils/mutation-types/patient/health-information'
export default {
  [ADD_HEALTH_INFORMATION]({ commit }, payload) {
    commit(ADD_HEALTH_INFORMATION, payload)
  },
  async [GET_HEALTH_INFORMATION]({ commit }, payload) {
    const user = JSON.parse(localStorage.getItem('user'))
    const config = {
      headers: { Authorization: `Bearer ${user.token.token}` },
      params: {
        ...payload,
      },
    }
    console.log(config, 'CONFIG')
    const { data } = await this.$axios.$get('/medical-history', config)
    commit(GET_HEALTH_INFORMATION, data)
  },
}
