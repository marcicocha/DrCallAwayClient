import { GET_CASE_FILE } from '@/utils/mutation-types/patient/case-file'

export default {
  [GET_CASE_FILE](state, payload) {
    state.caseFiles = payload
  },
}
