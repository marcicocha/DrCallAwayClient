import {
  GET_WAITING_ROOM,
  GET_HEALTH_INFORMATION,
} from '@/utils/mutation-types/nutritionist/waiting-room'
export default {
  async [GET_WAITING_ROOM]({ commit }, payload) {
    const user = JSON.parse(localStorage.getItem('user'))
    const config = {
      headers: { Authorization: `Bearer ${user.token.token}` },
      params: {
        ...payload,
      },
    }
    const { data } = await this.$axios.$get('cases/general-room', config)
    commit(GET_WAITING_ROOM, data)
  },

  async [GET_HEALTH_INFORMATION]({ commit }, payload) {
    const user = JSON.parse(localStorage.getItem('user'))
    const config = {
      headers: { Authorization: `Bearer ${user.token.token}` },
      params: {
        patient_id: payload,
      },
    }
    const { data } = await this.$axios.$get('medical-histories', config)
    commit(GET_HEALTH_INFORMATION, data)
  },
}
