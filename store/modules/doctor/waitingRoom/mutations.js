import {
  GET_GENERAL_WAITING_ROOM,
  GET_SPECIALIST_WAITING_ROOM,
  GET_HEALTH_INFORMATION,
} from '@/utils/mutation-types/doctor/waiting-room'

export default {
  [GET_GENERAL_WAITING_ROOM](state, payload) {
    state.generalWaitingList = payload
  },
  [GET_SPECIALIST_WAITING_ROOM](state, payload) {
    state.specialistWaitingList = payload
  },
  [GET_HEALTH_INFORMATION](state, payload) {
    state.healthInfoObj = payload[0]
  },
}
