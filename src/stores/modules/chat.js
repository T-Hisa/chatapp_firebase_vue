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
      const currentUid = rootGetters.getCurrentUid
      if (state.chat.direct && state.chat.direct[currentUid] && state.chat.direct[currentUid][otherUid]) {
        console.log('chatData in getter', state.chat.direct[currentUid][otherUid])
        return state.chat.direct[currentUid][otherUid]
      }
      return {}
    },
    getGroupChatData: (state) => (gid) => {
      return state.chat.groups[gid]
    }
  },
  mutations: {
  },
  actions: {
    getChatData: firebaseAction(({ bindFirebaseRef }) => {
      console.log('getChatData')
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
      let newCommentKey = sendChatRefWithType.push().key
      sendChatRefWithType.child(newCommentKey).set(sendValue)
    })
  }
}

export default chatModule
