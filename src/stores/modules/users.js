import { vuexfireMutations, firestoreAction } from 'vuexfire'
import db from '../firebasedb'
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
    ...vuexfireMutations
    // state.users[uid].email = profile.email
    // state.users[uid].name = profile.name
  },
  actions: {
    // registerProfileAction (context, profile) {
    //   console.log('value in action', profile)
    //   context.commit('registerProfileMutation', profile)
    // }
    registerProfileAction: firestoreAction((_, value) => {
      console.log('value in Action', value)
      const uid = value.uid
      let saveValue = {}
      saveValue[uid] = {
        email: value.email
      }
      console.log('saveValue', saveValue)
      // usersRef.set(saveValue)
      usersRef.update(saveValue)
    })
  }
}

export default userModule
