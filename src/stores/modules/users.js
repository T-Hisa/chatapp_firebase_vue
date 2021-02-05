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
    getUserName: (state) => (id) => {
      console.log('debug in getter', id)
      return state.users[id].name
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
    getUserInfo: firebaseAction(({ bindFirestoreRef }) => {
    }),
    registerProfileAction: firebaseAction((_, value) => {
      console.log('value in Action', value)
      const uid = value.uid
      let saveValue
      if (value.photoURL) {
        saveValue = {
          username: value.username,
          photoURL: value.photoURL
        }
      } else {
        saveValue = { username: value.username }
      }
      console.log('saveValue', saveValue)
      // usersRef.set(saveValue)
      usersRef.child(`${uid}`).update(saveValue)
    })
  }
}

export default userModule
