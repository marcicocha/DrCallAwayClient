import {
  GET_DOCTOR_CASE_FILE,
  ACCEPT_CASE_FILE,
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
  },
}
