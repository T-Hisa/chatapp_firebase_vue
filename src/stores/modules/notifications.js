import { firebaseAction } from 'vuexfire'
import firebase from 'firebase/app'
const db = firebase.database()
const notificationsRef = db.ref('notifications')

const notificationsModule = {
  namespaced: true,
  state: {
    notifications: {}
  },
  getters: {
    getUserEmail: (state) => (id) => {
      return state.users[id].email
    }
  },
  mutations: {
  },
  actions: {
    getNotification: firebaseAction(({ bindFirebaseRef, rootState }) => {
      const userNotificationRef = notificationsRef.child(rootState.currentUserId)
      bindFirebaseRef('notifications', userNotificationRef, { wait: true })
    })
    // getUserInfoData: firebaseAction(({ bindFirestoreRef }) => {
    // })
  }
}

export default notificationsModule
