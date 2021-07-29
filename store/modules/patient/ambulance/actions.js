import {
  GET_AMBULANCE,
  ADD_AMBULANCE,
} from '@/utils/mutation-types/patient/ambulance'
export default {
  async [GET_AMBULANCE]({ commit }, payload) {
    const user = JSON.parse(localStorage.getItem('user'))
    const config = {
      headers: { Authorization: `Bearer ${user.token.token}` },
      params: {
        ...payload,
      },
    }

    const { data } = await this.$axios.$get('patient/callups', config)
    commit(GET_AMBULANCE, data)
  },
  async [ADD_AMBULANCE]({ commit }, payload) {
    const user = JSON.parse(localStorage.getItem('user'))
    const config = {
      headers: { Authorization: `Bearer ${user.token.token}` },
    }
    const { data, message } = await this.$axios.$post('callUp', payload, config)
    commit(ADD_AMBULANCE, data)
    return message
  },
}
