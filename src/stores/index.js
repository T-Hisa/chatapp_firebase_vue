import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/users'
import chat from './modules/chat'
import groups from './modules/groups'
// import { firebaseAction, vuexfireMutations } from 'vuexfire'
import { vuexfireMutations } from 'vuexfire'
// import db from './firebasedb'
// import { SOME_MUTATION } from './mutation-types'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    users,
    chat,
    groups
  },
  state: {
    currentUserId: ''
  },
  getters: {
    getCurrentUid: (state) => {
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
    setCurrentUid (state, uid) {
      state.currentUserId = uid
    }
    // [SOME_MUTATION] (state) {
    //   something
    // }
  },
  actions: {
    // store.dispatch('sampleAction') で実行
    setCurrentUid (context, uid) {
      context.commit('setCurrentUid', uid)
    },
    sampleAction (context, n) {
      context.commit('sampleMutation', n)
    },
    catchFire (context) {
      this.dispatch('users/getUsersData')
    }
  }
  // strict: process.env.NODE_ENV === 'development'
})

store.dispatch('users/getUsersData')
store.dispatch('chat/getChatData')
store.dispatch('groups/getGroups')
export default store
