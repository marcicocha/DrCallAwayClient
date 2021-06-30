import { ADD_HEALTH_INFORMATION } from '@/utils/mutation-types/patient/health-information'
export default {
  [ADD_HEALTH_INFORMATION]({ commit }, payload) {
    commit(ADD_HEALTH_INFORMATION, payload)
  },
}
