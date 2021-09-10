import { GET_MESSAGE, POST_MESSAGE } from '@/utils/mutation-types/message'

export default {
  [GET_MESSAGE](state, payload) {
    state.messageList = payload
  },
  [POST_MESSAGE](state, payload) {
    state.messageList.push(payload)
  },
}
