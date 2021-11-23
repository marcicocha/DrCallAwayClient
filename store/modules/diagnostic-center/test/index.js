import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const state = () => ({
  tests: [],
  routineScreeningList: [],
})

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
