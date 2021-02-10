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
    getUserNotification: (state, _, rootState) => {
      const { currentUserId } = rootState
      return state.notifications[currentUserId]
    },
    getNotificationDetail: (state, _, rootState) => nid => {
      const { currentUserId } = rootState
      return state.notifications[currentUserId][nid]
    }
  },
  mutations: {
  },
  actions: {
    getNotification: firebaseAction(({bindFirebaseRef, rootState}) => {
      bindFirebaseRef(`notifications`, notificationsRef, { wait: true })
    }),
    removeNotifications: firebaseAction((_, value) => {
      const userNotificationsRef = notificationsRef.child(`${value.currentUid}`)
      for (const nid of value.notificationIds) {
        userNotificationsRef.child(nid).remove()
      }
    })
    // getUserInfoData: firebaseAction(({ bindFirestoreRef }) => {
    // })
  }
}

export default notificationsModule
