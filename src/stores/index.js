import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/users'
import chat from './modules/chat'
import groups from './modules/groups'
import notifications from './modules/notifications'
import { vuexfireMutations } from 'vuexfire'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    users,
    chat,
    groups,
    notifications
  },
  state: {
    currentUserId: ''
  },
  getters: {
    getCurrentUserId: (state) => {
      return state.currentUserId
    },
    getUserInfoFromRoot: (state) => uid => {
      return state.users.users[uid]
    }
  },
  mutations: {
    ...vuexfireMutations,
    setCurrentUserId (state, uid) {
      state.currentUserId = uid
    }
  },
  actions: {
    setCurrentUserId (context, uid) {
      context.commit('setCurrentUserId', uid)
    },
    initStore () {
      this.dispatch('users/getUsersData')
      this.dispatch('notifications/getNotification')
      this.dispatch('chat/getChatData')
      this.dispatch('groups/getGroups')
    }
  }
})

export default store
