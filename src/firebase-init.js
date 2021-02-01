import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

let firebaseConfig = {
  apiKey: 'AIzaSyBxjMCa_zsIBYui9TBMSdLk9CLM5R56OYI',
  authDomain: 'chat-app-db732.firebaseapp.com',
  projectId: 'chat-app-db732',
  storageBucket: 'chat-app-db732.appspot.com',
  messagingSenderId: '639039700405',
  databaseURL: 'https://chat-app-db732-default-rtdb.firebaseio.com/',
  appId: '1:639039700405:web:1a067e6775486600842dfc',
  measurementId: 'G-KPG0Y0XY15'
}
firebase.initializeApp(firebaseConfig)

Vue.prototype.$firebase = firebase
Vue.prototype.$currentUser = firebase.auth().currentUser
// Vue.prototype.$db = firebase.database()
export default firebase
