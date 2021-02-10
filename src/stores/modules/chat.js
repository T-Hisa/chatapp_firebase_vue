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
      // '${userid}': {
      // name: '',
      // email: ''
      // },
      // `${userId}`: {
      // }
    }
  }),
  // state.users[userId]
  getters: {
    getDirectChatData: (state, _, __, rootGetters) => (otherUid) => {
      const currentUid = rootGetters.getCurrentUid
      if (state.chat.direct && state.chat.direct[currentUid] && state.chat.direct[currentUid][otherUid]) {
        return state.chat.direct[currentUid][otherUid]
      }
      return {}
    },
    getGroupChatData: (state) => (gid) => {
      return state.chat.groups[gid]
    }
    // getUserName: (state) => (id) => {
    //   console.log('debug in getter', id)
    //   return state.users[id].name
    // },
    // getUserEmail: (state) => (id) => {
    //   return state.users[id].email
    // }
  },
  mutations: {
    // state.users[uid].email = profile.email
    // state.users[uid].name = profile.name
  },
  actions: {
    getChatData: firebaseAction(({ bindFirebaseRef }) => {
      console.log('getChatData')
      bindFirebaseRef('chat', chatRef, { wait: true })
    }),
    // getDirectChatData: firebaseAction(({ bindFirebaseRef }) => {
    //   console.log('getChatData')
    //   const directChatRef = chatRef.child('direct')
    //   bindFirebaseRef('chat/direct', directChatRef, { wait: true })
    // }),
    // getGroupChatData: firebaseAction(({ bindFirebaseRef }) => {
    //   console.log('getChatData')
    //   const groupChatRef = chatRef.child('groups')
    //   bindFirebaseRef('chat/groups', groupChatRef, { wait: true })
    // }),
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
    // registerProfileAction: firebaseAction((_, value) => {
    //   console.log('value in Action', value)
    //   const uid = value.uid
    //   let saveValue
    //   if (value.photoURL) {
    //     saveValue = {
    //       username: value.username,
    //       emailVerified: true,
    //       photoURL: value.photoURL
    //     }
    //   } else {
    //     saveValue = { username: value.username, emailVerified: true }
    //   }
    //   console.log('saveValue', saveValue)
    //   // usersRef.set(saveValue)
    //   usersRef.child(`${uid}`).update(saveValue)
    // })
  }
}

export default chatModule
