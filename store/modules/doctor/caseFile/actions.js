import {
  GET_DOCTOR_CASE_FILE,
  ACCEPT_CASE_FILE,
  ADD_PRESCRIPTION,
  ADD_TEST,
  GET_ALL_TEST,
  RESET_CASE_FILE,
} from '@/utils/mutation-types/doctor/case-file'
export default {
  async [GET_DOCTOR_CASE_FILE]({ commit }, payload) {
    const user = JSON.parse(localStorage.getItem('user'))
    const config = {
      headers: { Authorization: `Bearer ${user.token.token}` },
      params: {
        ...payload,
      },
    }
    const { data } = await this.$axios.$get('doctor/cases', config)
    commit(GET_DOCTOR_CASE_FILE, data)
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
    return data
  },
  async [ADD_PRESCRIPTION]({ commit }, payload) {
    const user = JSON.parse(localStorage.getItem('user'))
    const config = {
      headers: { Authorization: `Bearer ${user.token.token}` },
    }
    const { message } = await this.$axios.$post(
      `prescriptions`,
      payload,
      config
    )
    commit(ADD_PRESCRIPTION, payload)
    return message
  },
  async [ADD_TEST]({ commit }, payload) {
    const user = JSON.parse(localStorage.getItem('user'))
    const config = {
      headers: { Authorization: `Bearer ${user.token.token}` },
    }
    const { data, message } = await this.$axios.$post(
      `/diagnosis/tests`,
      payload,
      config
    )
    commit(ADD_TEST, data)
    return message
  },
  async [GET_ALL_TEST]({ commit }, payload) {
    const user = JSON.parse(localStorage.getItem('user'))
    const config = {
      headers: { Authorization: `Bearer ${user.token.token}` },
      params: {
        ...payload,
      },
    }
    const data = await this.$axios.$get('test_all_list', config)
    commit(GET_ALL_TEST, data)
    return data
  },
  [RESET_CASE_FILE]({ commit }) {
    commit(RESET_CASE_FILE)
  },
}
