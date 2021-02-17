import { firebaseAction } from 'vuexfire'
import firebase from 'firebase/app'
const db = firebase.database()
const chatRef = db.ref('chat')

const chatModule = {
  namespaced: true,
  state: () => ({
    chat: {
      groups: {},
      direct: {}
    }
  }),
  getters: {
    getDirectChatData: (state, _, __, rootGetters) => (otherUid) => {
      const currentUid = rootGetters.getCurrentUserId
      if (state.chat.direct && state.chat.direct[currentUid] && state.chat.direct[currentUid][otherUid]) {
        return state.chat.direct[currentUid][otherUid]
      }
      return {}
    },
    getGroupChatData: (state) => (gid) => {
      const groups = state.chat.groups || {}
      return groups[gid]
    }
  },
  actions: {
    getChatData: firebaseAction(({ bindFirebaseRef }) => {
      bindFirebaseRef('chat', chatRef, { wait: true })
    }),
    sendChatData: firebaseAction((_, value) => {
      let sendChatRefWithType
      let sendValue = {
        body: value.body,
        timestamp: new Date().getTime()
      }
      if (value.type === 'group') {
        sendChatRefWithType = chatRef.child(`groups/${value.gid}`)
        sendValue['uid'] = value.uid
      } else {
        sendChatRefWithType = chatRef.child(`direct/${value.uid}/${value.partner}`)
        sendValue['which'] = 'me'
      }
      const newCommentKey = sendChatRefWithType.push().key
      sendChatRefWithType.child(newCommentKey).set(sendValue)
    })
  }
}

export default chatModule
