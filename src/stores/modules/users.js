import { firebaseAction } from 'vuexfire'
import firebase from 'firebase/app'
const db = firebase.database()
const usersRef = db.ref('users')

const userModule = {
  namespaced: true,
  state: () => ({
    users: {
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
    getUsers: (state) => {
      return state.users
    },
    getUserInfo: (state) => (uid) => {
      return state.users[uid]
    },
    getUsersInfo: (_, getters) => (uids) => {
      return uids.map(uid => getters.getUserInfo(uid))
    },
    getUserEmail: (state) => (id) => {
      return state.users[id].email
    }
  },
  mutations: {
    // state.users[uid].email = profile.email
    // state.users[uid].name = profile.name
  },
  actions: {
    // registerProfileAction (context, profile) {
    //   console.log('value in action', profile)
    //   context.commit('registerProfileMutation', profile)
    // },
    getUsersData: firebaseAction(({ bindFirebaseRef }) => {
      // console.log('getUsersData')
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
