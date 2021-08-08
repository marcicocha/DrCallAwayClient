import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const state = () => ({
  waitingList: [],
  healthInfoObj: {},
})

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
