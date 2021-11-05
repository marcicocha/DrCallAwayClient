import {
  GET_CASE_FILE,
  RESET_CASE_FILE,
  GET_CASE_FILE_BY_ID,
} from '@/utils/mutation-types/patient/case-file'
export default {
  async [GET_CASE_FILE]({ commit }, payload) {
    const user = JSON.parse(localStorage.getItem('user'))
    const config = {
      headers: { Authorization: `Bearer ${user.token.token}` },
      params: {
        ...payload,
      },
    }
    const { data } = await this.$axios.$get('cases', config)
    commit(GET_CASE_FILE, data)
  },
  [RESET_CASE_FILE]({ commit }) {
    commit(RESET_CASE_FILE)
  },
  async [GET_CASE_FILE_BY_ID]({ commit }, payload) {
    const user = JSON.parse(localStorage.getItem('user'))
    const config = {
      headers: { Authorization: `Bearer ${user.token.token}` },
      params: {
        ...payload,
      },
    }
    const { data } = await this.$axios.$get('cases', config)

    commit(GET_CASE_FILE_BY_ID, data)
  },
}
