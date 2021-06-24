import { GET_CASE_FILE } from '@/utils/mutation-types/patient/case-file'
export default {
  async [GET_CASE_FILE]({ commit }, payload) {
    const user = JSON.parse(localStorage.getItem('user'))
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
      params: {
        ...payload,
      },
    }
    const { response } = await this.$axios.$get('cases', config)
    commit(GET_CASE_FILE, response)
  },
}
