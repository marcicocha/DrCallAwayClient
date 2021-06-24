import {
  GET_AMBULANCE,
  ADD_AMBULANCE,
} from '@/utils/mutation-types/patient/ambulance'
export default {
  async [GET_AMBULANCE]({ commit }, payload) {
    const user = JSON.parse(localStorage.getItem('user'))
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
      params: {
        ...payload,
      },
    }

    const { response } = await this.$axios.$get('callUp', config)
    commit(GET_AMBULANCE, response)
  },
  async [ADD_AMBULANCE]({ commit }, payload) {
    const user = JSON.parse(localStorage.getItem('user'))
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    }
    const { response } = await this.$axios.$post('callUp', payload, config)
    commit(ADD_AMBULANCE, response)
  },
}
