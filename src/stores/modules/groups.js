import { firebaseAction } from 'vuexfire'
import firebase from 'firebase/app'
const db = firebase.database()
const groupsRef = db.ref('groups')

const groupsModule = {
  namespaced: true,
  state: () => ({
    groups: {
    }
  }),
  getters: {
    getGroupIds: (state) => {
      return Object.keys(state.groups)
    },
    getGroups: (state) => {
      console.log('groupstate', state)
      return state.groups
    },
    getGroupInfo: (state) => gid => {
      return state.groups[gid]
    }
    // getUsers: (state) => {
    //   return state.users
    // },
    // getUserInfo: (state) => (id) => {
    //   return state.users[id]
    // },
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
    // registerProfileAction (context, profile) {
    //   console.log('value in action', profile)
    //   context.commit('registerProfileMutation', profile)
    // },
    getGroups: firebaseAction(({ bindFirebaseRef }) => {
      // console.log('getUsersData')
      bindFirebaseRef('groups', groupsRef, { wait: true })
    }),
    // getUserInfoData: firebaseAction(({ bindFirestoreRef }) => {
    // }),
    updateGroup: firebaseAction((_, value) => {
      console.log('update group')
      let updateGroupRef = groupsRef.child(value.gid)
      updateGroupRef.update(value.value)
    }),
    createGroup: firebaseAction((_, value) => {
      let newGroupKey = groupsRef.push().key
      groupsRef.child(newGroupKey).set(value)
    })
  }
}

export default groupsModule
