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
      console.log('debug in getter' ,id)
      return state.users[id].name
    },
    getUserEmail: (state) => (id) => {
      return state.users[id].email
    }
  },
  mutations: {
    registerProfileMutation (state, profile) {
      console.log('value in mutation', profile)
      const uid = profile.uid
      state.users[uid]= {
        name: profile.name,
        email: profile.email
      }
      // state.users[uid].email = profile.email
      // state.users[uid].name = profile.name
    }
  },
  actions: {
    registerProfileAction (context, profile) {
      console.log('value in action', profile)
      context.commit('registerProfileMutation', profile)
    }
  }
}

export default userModule
