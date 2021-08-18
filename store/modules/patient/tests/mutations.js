import {
  GET_TESTS,
  GET_ALL_MEDICAL_SCREENING,
} from '@/utils/mutation-types/patient/tests'

export default {
  [GET_TESTS](state, payload) {
    state.tests = payload.data
  },
  [GET_ALL_MEDICAL_SCREENING](state, payload) {
    state.medicalScreenings = payload
  },
}
