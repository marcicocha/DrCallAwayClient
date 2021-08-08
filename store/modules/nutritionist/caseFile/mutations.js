import {
  GET_NUTRITIONIST_CASE_FILE,
  ACCEPT_CASE_FILE,
  ADD_PRESCRIPTION,
  ADD_TEST,
} from '@/utils/mutation-types/nutritionist/case-file'

export default {
  [GET_NUTRITIONIST_CASE_FILE](state, payload) {
    state.caseFiles = payload
  },
  [ACCEPT_CASE_FILE](state, payload) {},
  [ADD_PRESCRIPTION](state, payload) {
    state.prescriptionList.push(payload.drugs)
  },
  [ADD_TEST](state, payload) {},
}
