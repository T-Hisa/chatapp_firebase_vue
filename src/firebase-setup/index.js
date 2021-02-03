import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/functions'
import 'firebase/storage'
// import 'firebase/firestore'
import firebaseConfig from './firebaseConfig'

firebase.initializeApp(firebaseConfig)

Vue.prototype.$firebase = firebase
Vue.prototype.$currentUser = firebase.auth().currentUser
export default firebase
