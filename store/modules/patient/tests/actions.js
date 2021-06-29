import { GET_TESTS } from '@/utils/mutation-types/patient/tests'
export default {
  async [GET_TESTS]({ commit }, payload) {
    const user = JSON.parse(localStorage.getItem('user'))
    const config = {
      headers: { Authorization: `Bearer ${user.token.token}` },
      params: {
        ...payload,
      },
    }
    const { data } = await this.$axios.$get('tests', config)
    commit(GET_TESTS, data)
  },
}
