import Vue from 'vue'
import firebase from './firebase-setup'
import App from './App'
import router from './router'
import routeAroundSign from './router/routeAroundSign'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue'
import VueI18n from 'vue-i18n'
import Vuelidate from 'vuelidate'
import store from './stores'
import settings from '@/config/settings'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.use(Vuelidate)
Vue.config.productionTip = false
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'ja',
  messages: settings.messages
})

const changeLocale = (val) => { i18n.locale = val }
Vue.prototype.$changeLocale = changeLocale

firebase.auth().onAuthStateChanged(user => {
  routeAroundSign(user)

  if (user) {
    console.log('currentUser', user)
    Vue.prototype.$currentUser = user
    Vue.prototype.$currentUserId = user.uid
    store.dispatch('setCurrentUserId', user.uid)
  } else {
    Vue.prototype.$currentUser = null
    Vue.prototype.$currentUserId = null
  }

  const appVue = new Vue({
    el: '#app',
    i18n,
    router,
    store,
    components: { App },
    template: '<App/>'
  })

  appVue.$mount('#app')
})
