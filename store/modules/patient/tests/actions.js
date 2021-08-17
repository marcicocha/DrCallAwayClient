import {
  GET_TESTS,
  GET_ALL_MEDICAL_SCREENING,
} from '@/utils/mutation-types/patient/tests'
export default {
  async [GET_TESTS]({ commit }, payload) {
    const user = JSON.parse(localStorage.getItem('user'))
    const config = {
      headers: { Authorization: `Bearer ${user.token.token}` },
      params: {
        ...payload,
      },
    }
    const { data } = await this.$axios.$get('/tests/patient/list', config)
    commit(GET_TESTS, data)
  },
  async [GET_ALL_MEDICAL_SCREENING]({ commit }, payload) {
    const user = JSON.parse(localStorage.getItem('user'))
    const config = {
      headers: { Authorization: `Bearer ${user.token.token}` },
      params: {
        ...payload,
      },
    }
    const { data } = await this.$axios.$get(
      'medical_screening_packages',
      config
    )
    commit(GET_ALL_MEDICAL_SCREENING, data)
    return data
  },
}
