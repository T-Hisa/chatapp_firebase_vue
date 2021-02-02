import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/users'
// import { firebaseMutations, firebaseAction } from 'vuexfire'
// import db from './firebasedb'
// import { SOME_MUTATION } from './mutation-types'

// import { DataStore } from '@aws-amplify/datastore'
// import { SampleModel } from '../models'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    users
  },
  state: {
    count: 0
  },
  getters: {
    sampleGetter: (state, getters, rootState, rootGetters) => (id) => {
      return state.filter(state.id === id)
    }
  },
  mutations: {
    // store.commit('sampleMutation', 10) で実行
    // store.commit({ type: 'sampleMutation', amount: 10})
    sampleMutation (state, n) {
      state.count += n // 後者の場合 n.amount でもアクセス可
    }
    // [SOME_MUTATION] (state) {
    //   something
    // }
  },
  actions: {
    // store.dispatch('sampleAction') で実行
    sampleAction (context, n) {
      context.commit('sampleMutation', n)
    }
  },
  strict: process.env.NODE_ENV === 'development'
})
export default store
