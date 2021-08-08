import {
  GET_NUTRITIONIST_CASE_FILE,
  ACCEPT_CASE_FILE,
  ADD_PRESCRIPTION,
  ADD_TEST,
} from '@/utils/mutation-types/nutritionist/case-file'
export default {
  async [GET_NUTRITIONIST_CASE_FILE]({ commit }, payload) {
    const user = JSON.parse(localStorage.getItem('user'))
    const config = {
      headers: { Authorization: `Bearer ${user.token.token}` },
      params: {
        ...payload,
      },
    }
    const { data } = await this.$axios.$get('doctor/cases', config)
    commit(GET_NUTRITIONIST_CASE_FILE, data)
  },
  async [ACCEPT_CASE_FILE]({ commit }, payload) {
    const user = JSON.parse(localStorage.getItem('user'))
    const config = {
      headers: { Authorization: `Bearer ${user.token.token}` },
    }
    const { data } = await this.$axios.$patch(
      `cases/${payload}`,
      payload,
      config
    )
    commit(ACCEPT_CASE_FILE, data)
  },
  async [ADD_PRESCRIPTION]({ commit }, payload) {
    const user = JSON.parse(localStorage.getItem('user'))
    const config = {
      headers: { Authorization: `Bearer ${user.token.token}` },
    }
    const { data, message } = await this.$axios.$post(
      `prescriptions`,
      payload,
      config
    )
    commit(ADD_PRESCRIPTION, data)
    return message
  },
  async [ADD_TEST]({ commit }, payload) {
    const user = JSON.parse(localStorage.getItem('user'))
    const config = {
      headers: { Authorization: `Bearer ${user.token.token}` },
    }
    const { data, message } = await this.$axios.$post(
      `prescriptions`,
      payload,
      config
    )
    commit(ADD_TEST, data)
    return message
  },
}
