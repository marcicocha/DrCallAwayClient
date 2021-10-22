import { GET_TEST } from '@/utils/mutation-types/diagnostic-center/test'

export default {
  [GET_TEST](state, payload) {
    state.tests = payload
  },
}
