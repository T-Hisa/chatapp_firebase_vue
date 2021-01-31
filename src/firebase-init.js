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
  appId: '1:639039700405:web:1a067e6775486600842dfc',
  measurementId: 'G-KPG0Y0XY15'
}
firebase.initializeApp(firebaseConfig)
console.log('firebase in firebase-init', firebase)
Vue.prototype.$firebase = firebase
Vue.prototype.$currentUser = firebase.auth().currentUser
firebase.auth().onAuthStateChanged(user => {
  console.log('auth state channged!!')
  if (user) {
    Vue.prototype.$currentUser = user
  } else {
    Vue.prototype.$currentUser = null
  }
})
// firebase.initializeApp({
//   credential: admin.credential.applicationDefault()
//   // credential: admin.credential.cert(serviceAccount)
//   // databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
// });
// export const auth = firebase.auth()
export default firebase
// export default firebaseConfig
