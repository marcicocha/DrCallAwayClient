import {
  GET_TEST,
  GET_ROUTINE_TEST,
  RESET_ROUTINE_TEST,
} from '@/utils/mutation-types/diagnostic-center/test'

export default {
  [GET_TEST](state, payload) {
    state.tests = payload
  },
  [GET_ROUTINE_TEST](state, payload) {
    state.routineScreeningList = payload
  },
  [RESET_ROUTINE_TEST](state) {
    state.routineScreeningList = []
    state.test = []
  },
}
