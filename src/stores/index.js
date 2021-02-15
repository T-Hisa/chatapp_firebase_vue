import Vue from 'vue'
import Vuex from 'vuex'

import users from './modules/users'
import chat from './modules/chat'
import groups from './modules/groups'
import notifications from './modules/notifications'
// import { firebaseAction, vuexfireMutations } from 'vuexfire'
import { vuexfireMutations } from 'vuexfire'
// import db from './firebasedb'
// import { SOME_MUTATION } from './mutation-types'

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
    sampleGetter: (state, getters, rootState, rootGetters) => (id) => {
      return state.filter(state.id === id)
    }
  },
  mutations: {
    ...vuexfireMutations,
    // store.commit('sampleMutation', 10) で実行
    // store.commit({ type: 'sampleMutation', amount: 10})
    sampleMutation (state, n) {
      state.count += n // 後者の場合 n.amount でアクセス可
    },
    setCurrentUserId (state, uid) {
      state.currentUserId = uid
    }
    // [SOME_MUTATION] (state) {
    //   something
    // }
  },
  actions: {
    // store.dispatch('sampleAction') で実行
    setCurrentUserId (context, uid) {
      context.commit('setCurrentUserId', uid)
    },
    sampleAction (context, n) {
      context.commit('sampleMutation', n)
    },
    initStore () {
      this.dispatch('users/getUsersData')
      this.dispatch('notifications/getNotification')
      this.dispatch('chat/getChatData')
      this.dispatch('groups/getGroups')
    }
  }
})

store.dispatch('initStore')
export const initFunc = () => store.dispatch('initStore')
export default store
