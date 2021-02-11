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
    getUserEmail: (state) => (id) => {
      return state.users[id].email
    },
    getOtherUserIds (state, getters, rootState, _) {
      const otherUserIds = Object.keys(state.users).filter(uid => {
        return uid !== rootState.currentUserId && getters.getUserInfo(uid).username
      })
      return otherUserIds
    },
    searchOtherUserIds: (state, getters, rootState) => searchParams => {
      const {users} = state
      const searchOtherUserIds = Object.keys(users).filter(uid => {
        const username = users[uid].username
        return username.indexOf(searchParams) > -1 && uid !== rootState.currentUserId &&
                 getters.getUserInfo(uid).emailVerified
      })
      return searchOtherUserIds
    }
  },
  mutations: {
  },
  actions: {
    getUsersData: firebaseAction(({ bindFirebaseRef }) => {
      bindFirebaseRef('users', usersRef, { wait: true })
    }),
    getUserInfoData: firebaseAction(({ bindFirestoreRef }) => {
    }),
    registerProfile: firebaseAction((_, value) => {
      const uid = value.uid
      let saveValue = {
        username: value.username,
        emailVerified: true,
        photoURL: value.photoURL,
        photoRef: value.photoRef
      }
      usersRef.child(`${uid}`).update(saveValue)
    })
  }
}

export default userModule
