import {
  GET_CASE_FILE,
  RESET_CASE_FILE,
} from '@/utils/mutation-types/patient/case-file'

export default {
  [GET_CASE_FILE](state, payload) {
    state.caseFiles = payload.data
  },
  [RESET_CASE_FILE](state) {
    state.caseFiles = []
  },
}
