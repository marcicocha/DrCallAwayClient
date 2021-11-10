import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const state = () => ({
  appointments: [],
  moveToBooked: false,
})

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
