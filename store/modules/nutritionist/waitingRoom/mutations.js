import {
  GET_WAITING_ROOM,
  GET_HEALTH_INFORMATION,
} from '@/utils/mutation-types/nutritionist/waiting-room'

export default {
  [GET_WAITING_ROOM](state, payload) {
    state.waitingList = payload
  },
  [GET_HEALTH_INFORMATION](state, payload) {
    state.healthInfoObj = payload[0]
  },
}
