import {
  GET_DOCTOR_CASE_FILE,
  ACCEPT_CASE_FILE,
  ADD_PRESCRIPTION,
  ADD_TEST,
  GET_ALL_TEST,
} from '@/utils/mutation-types/doctor/case-file'

export default {
  [GET_DOCTOR_CASE_FILE](state, payload) {
    state.caseFiles = payload
  },
  [ACCEPT_CASE_FILE](state, payload) {},
  [ADD_PRESCRIPTION](state, payload) {
    console.log(payload.drugs, 'DRUGS')
    state.prescriptionList.push(payload.drugs)
  },
  [ADD_TEST](state, payload) {},
  [GET_ALL_TEST](state, payload) {
    state.testList = payload
  },
}
