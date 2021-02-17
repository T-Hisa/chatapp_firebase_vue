import firebase from '../firebase-setup'

function validation (to, next) {
  const currentUser = firebase.auth().currentUser
  const isRequiredAuth = to.matched.some(value => value.meta.isRequiredAuth)
  const isRequiredProfile = to.matched.some(value => value.meta.isRequiredProfile)
  if (isRequiredProfile) {
    if (currentUser) {
      if (currentUser.displayName) next()
      else next('/setup-profile')
    } else {
      next('/signin')
    }
  } else if (isRequiredAuth) {
    if (currentUser) {
      if (currentUser.displayName) next('/direct')
      else next()
    } else {
      next('/signin')
    }
  } else {
    if (currentUser) {
      if (currentUser.displayName) next('/direct')
      else next('/setup-profile')
    } else {
      next()
    }
  }
}

export default validation
