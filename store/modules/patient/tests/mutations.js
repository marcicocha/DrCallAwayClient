import { GET_TESTS } from '@/utils/mutation-types/patient/tests'

export default {
  [GET_TESTS](state, payload) {
    state.tests = payload
  },
}
