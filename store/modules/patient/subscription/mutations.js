import {
  RENEW_SUBSCRIPTION,
  CHANGE_SUBSCRIPTION,
  GET_SUBSCRIPTION,
} from '@/utils/mutation-types/patient/subscribe'

export default {
  [GET_SUBSCRIPTION](state, payload) {
    state.subscriptionObj = payload
  },
  [CHANGE_SUBSCRIPTION](state, payload) {
    state.subscriptionObj = payload
  },
  [RENEW_SUBSCRIPTION](state, payload) {
    state.subscriptionObj = payload
  },
}
