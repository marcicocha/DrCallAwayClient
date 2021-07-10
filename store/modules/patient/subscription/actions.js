import {
  RENEW_SUBSCRIPTION,
  CHANGE_SUBSCRIPTION,
  GET_SUBSCRIPTION,
} from '@/utils/mutation-types/patient/subscribe'
export default {
  async [GET_SUBSCRIPTION]({ commit }, payload) {
    const user = JSON.parse(localStorage.getItem('user'))
    const config = {
      headers: { Authorization: `Bearer ${user.token.token}` },
      params: {
        ...payload,
      },
    }
    const { data } = await this.$axios.$get('subscription', config)
    commit(GET_SUBSCRIPTION, data)
  },
  async [RENEW_SUBSCRIPTION]({ commit }, payload) {
    const user = JSON.parse(localStorage.getItem('user'))
    const config = {
      headers: { Authorization: `Bearer ${user.token.token}` },
    }
    const { data, message } = await this.$axios.$post(
      'renew-subscription',
      payload,
      config
    )
    commit(RENEW_SUBSCRIPTION, data)
    return message
  },
  async [CHANGE_SUBSCRIPTION]({ commit }, payload) {
    const user = JSON.parse(localStorage.getItem('user'))
    const config = {
      headers: { Authorization: `Bearer ${user.token.token}` },
    }
    const { data, message } = await this.$axios.$post(
      'change-subscription',
      payload,
      config
    )
    commit(CHANGE_SUBSCRIPTION, data)
    return message
  },
}
