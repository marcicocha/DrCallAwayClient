import {
  GET_DOCTOR_CASE_FILE,
  ACCEPT_CASE_FILE,
} from '@/utils/mutation-types/doctor/case-file'

export default {
  [GET_DOCTOR_CASE_FILE](state, payload) {
    state.caseFiles = payload
  },
  [ACCEPT_CASE_FILE](state, payload) {},
}
