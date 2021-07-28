import { GET_CALL_UP } from '@/utils/mutation-types/ambulance/call-up'

export default {
  [GET_CALL_UP](state, payload) {
    state.callUpList = payload.data
  },
}
