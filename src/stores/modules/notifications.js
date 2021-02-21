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
    getUserNotification: (state, _, __, rootGetters) => {
      const currentUserId = rootGetters.getCurrentUserId
      const notifications = state.notifications || {}
      return notifications[currentUserId]
    },
    getNotificationDetail: (state, _, rootState) => nid => {
      const { currentUserId } = rootState
      return state.notifications[currentUserId][nid]
    },
    getNotificationIds: (_, getters) => {
      return Object.keys(getters.getUserNotification || {})
    }
  },
  actions: {
    getNotification: firebaseAction(({bindFirebaseRef}) => {
      bindFirebaseRef(`notifications`, notificationsRef, { wait: true })
    }),
    removeNotifications: firebaseAction((_, value) => {
      const userNotificationsRef = notificationsRef.child(`${value.currentUid}`)
      for (const nid of value.notificationIds) {
        userNotificationsRef.child(nid).remove()
      }
    })
  }
}

export default notificationsModule
