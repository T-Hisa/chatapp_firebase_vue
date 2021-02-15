import { firebaseAction } from 'vuexfire'
import firebase from 'firebase/app'
const db = firebase.database()
const usersRef = db.ref('users')

const userModule = {
  namespaced: true,
  state: () => ({
    users: {}
  }),
  getters: {
    getUsers: (state) => {
      return state.users
    },
    getUserInfo: (state) => uid => {
      return state.users[uid]
    },
    getUsersInfo: (_, getters) => uids => {
      return uids.map(uid => getters.getUserInfo(uid))
    },
    getOtherUserIds (state, getters, rootState) {
      const otherUserIds = Object.keys(state.users).filter(uid => {
        return uid !== rootState.currentUserId && getters.getUserInfo(uid).username
      })
      return otherUserIds
    },
    searchOtherUserIds: (state, getters, rootState) => searchParams => {
      const {users} = state
      const searchOtherUserIds = Object.keys(users).filter(uid => {
        const username = users[uid].username || ''
        return username.indexOf(searchParams) > -1 && uid !== rootState.currentUserId &&
                 getters.getUserInfo(uid).emailVerified
      })
      return searchOtherUserIds
    }
  },
  actions: {
    getUsersData: firebaseAction(({ bindFirebaseRef }) => {
      bindFirebaseRef('users', usersRef, { wait: true })
    }),
    registerProfile: firebaseAction((_, value) => {
      const uid = value.uid
      const saveValue = {
        username: value.username,
        emailVerified: true,
        photoURL: value.photoURL,
        photoRef: value.photoRef
      }
      usersRef.child(uid).update(saveValue)
    }),
    setLocale: firebaseAction((context, value) => {
      const uid = context.rootState.currentUserId
      usersRef.child(uid).update({lang: value})
    })
  }
}

export default userModule
