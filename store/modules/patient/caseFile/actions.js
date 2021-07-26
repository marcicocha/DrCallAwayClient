import {
  GET_CASE_FILE,
  GET_ADMIN_CASE_FILE,
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
  async [GET_ADMIN_CASE_FILE]({ commit }, payload) {
    const user = JSON.parse(localStorage.getItem('user'))
    const config = {
      headers: { Authorization: `Bearer ${user.token.token}` },
      params: {
        ...payload,
      },
    }
    const { data } = await this.$axios.$get('/cases/specialist-room', config)
    commit(GET_ADMIN_CASE_FILE, data)
  },
}
