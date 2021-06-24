import { ADD_HEALTH_INFORMATION } from '@/utils/mutation-types/patient/health-information'

export default {
  [ADD_HEALTH_INFORMATION](state, payload) {
    state.healthInfos.unshift(payload)
  },
}
