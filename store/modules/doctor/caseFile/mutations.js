import {
  GET_DOCTOR_CASE_FILE,
  ACCEPT_CASE_FILE,
  ADD_PRESCRIPTION,
  ADD_TEST,
  GET_ALL_TEST,
  RESET_CASE_FILE,
} from '@/utils/mutation-types/doctor/case-file'

export default {
  [GET_DOCTOR_CASE_FILE](state, payload) {
    state.caseFiles = payload
  },
  [ACCEPT_CASE_FILE](state, payload) {},
  [ADD_PRESCRIPTION](state, payload) {
    state.prescriptionList = [...state.prescriptionList, ...payload.drugs]
  },
  [ADD_TEST](state, payload) {
    state.testList = payload[0].tests
  },
  [GET_ALL_TEST](state, payload) {
    state.testList = payload
  },
  [RESET_CASE_FILE](state) {
    state.caseFiles = []
  },
}
