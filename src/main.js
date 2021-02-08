import Vue from 'vue'
import firebase from './firebase-setup'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue'
import VueI18n from 'vue-i18n'
import Vuelidate from 'vuelidate'
import store from './stores'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
console.log('firebase', firebase)
console.log('environment', process.env)
Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.use(Vuelidate)
Vue.config.productionTip = false
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
  if (user) {
    Vue.prototype.$currentUser = user
    Vue.prototype.$currentUserId = user.uid
  } else {
    Vue.prototype.$currentUser = null
    Vue.prototype.$currentUserId = null
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

// let initPromises = []
// let initFirebaseAuth = firebase.auth().onAuthStateChanged
// initPromises.push(initFirebaseAuth)
// initPromises.push(storeInitPromises)
// Promise.all(initPromises).then((value) => {
//   console.log('value', value)
//   console.log('storeInitCompleted!!')
//   new Vue({
//     el: '#app',
//     // i18n: i18n,
//     router,
//     store,
//     components: { App },
//     template: '<App/>'
//     // updated () {
//     //   if (firebase.auth().currentUser)
//     // }
//   })
// })
