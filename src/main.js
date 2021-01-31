// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import firebase from './firebase-init'
import firebase from 'firebase/app'
// import firebaseConfig from './firebase-init'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue'
import VueI18n from 'vue-i18n'
import store from './stores/vuex'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Vue.prototype.$firebase = firebase

Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.config.productionTip = false

// Vue.prototype.$currentUser = firebase.auth().currentUser
// firebase.auth().onAuthStateChanged(user => {
//   console.log('auth state channged!!')
//   if (user) {
//     Vue.prototype.$currentUser = user
//   } else {
//     Vue.prototype.$currentUser = null
//   }
// })
Vue.use(VueI18n)

// const messages = {
//   ja: {
//   }
// }
// let i18n = new VueI18n({
//   locale: 'ja',
//   messages: messages
// })

/* eslint-disable no-new */
// let promise = new Promise(resolve, reject) {
//   firebase.initializeApp(firebaseConfig)
// }
firebase.auth().onAuthStateChanged(user => {
  console.log('auth state channged!!')
  if (user) {
    Vue.prototype.$currentUser = user
  } else {
    Vue.prototype.$currentUser = null
  }
  new Vue({
    el: '#app',
    // i18n: i18n,
    router,
    store,
    components: { App },
    template: '<App/>'
  })
})

