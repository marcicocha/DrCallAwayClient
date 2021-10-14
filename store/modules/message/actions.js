import {
  GET_MESSAGE,
  POST_MESSAGE,
  RESET_MESSAGE,
} from '@/utils/mutation-types/message'
export default {
  async [GET_MESSAGE]({ commit }, payload) {
    const user = JSON.parse(localStorage.getItem('user'))
    const config = {
      headers: { Authorization: `Bearer ${user.token.token}` },
      // params: {
      //   ...payload,
      // },
    }
    const { data } = await this.$axios.$get(
      `/cases/${payload}/messages`,
      config
    )
    commit(GET_MESSAGE, data)
  },
  async [POST_MESSAGE]({ commit }, payload) {
    const user = JSON.parse(localStorage.getItem('user'))
    const config = {
      headers: { Authorization: `Bearer ${user.token.token}` },
    }
    const { data } = await this.$axios.$post(
      `/cases/${payload.case_id}/messages`,
      payload,
      config
    )
    commit(POST_MESSAGE, data)
  },
  [RESET_MESSAGE]({ commit }) {
    commit(RESET_MESSAGE)
  },
}
