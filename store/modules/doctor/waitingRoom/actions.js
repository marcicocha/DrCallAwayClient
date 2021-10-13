import {
  GET_GENERAL_WAITING_ROOM,
  GET_SPECIALIST_WAITING_ROOM,
  GET_HEALTH_INFORMATION,
  RESET_WAITING_ROOM,
} from '@/utils/mutation-types/doctor/waiting-room'
export default {
  async [GET_GENERAL_WAITING_ROOM]({ commit }, payload) {
    const user = JSON.parse(localStorage.getItem('user'))
    const config = {
      headers: { Authorization: `Bearer ${user.token.token}` },
      params: {
        ...payload,
      },
    }
    const { data } = await this.$axios.$get('cases/general-room', config)
    commit(GET_GENERAL_WAITING_ROOM, data)
  },
  async [GET_SPECIALIST_WAITING_ROOM]({ commit }, payload) {
    const user = JSON.parse(localStorage.getItem('user'))
    const config = {
      headers: { Authorization: `Bearer ${user.token.token}` },
      params: {
        ...payload,
      },
    }
    const { data } = await this.$axios.$get('cases/specialist-room', config)
    commit(GET_SPECIALIST_WAITING_ROOM, data)
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
  [RESET_WAITING_ROOM]({ commit }) {
    commit(RESET_WAITING_ROOM)
  },
}
