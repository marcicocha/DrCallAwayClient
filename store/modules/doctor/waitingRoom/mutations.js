import {
  GET_GENERAL_WAITING_ROOM,
  GET_SPECIALIST_WAITING_ROOM,
} from '@/utils/mutation-types/doctor/waiting-room'

export default {
  [GET_GENERAL_WAITING_ROOM](state, payload) {
    state.generalWaitingList = payload
  },
  [GET_SPECIALIST_WAITING_ROOM](state, payload) {
    state.specialistWaitingList = payload
  },
}
