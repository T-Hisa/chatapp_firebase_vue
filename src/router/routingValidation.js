import firebase from '../firebase-setup'

function validation (to, next) {
  const currentUser = firebase.auth().currentUser
  const isRequiredEmailValidation = to.matched.some(value => value.meta.isRequiredEmailValidation)
  const isRequiredAuth = to.matched.some(value => value.meta.isRequiredAuth)
  const isRequiredProfile = to.matched.some(value => value.meta.isRequiredProfile)
  if (isRequiredProfile) {
    if (currentUser) {
      if (currentUser.emailVerified) {
        if (currentUser.displayName) next()
        else next('/setup-profile')
      } else {
        next('/confirm')
      }
    } else {
      next('/signin')
    }
  } else if (isRequiredEmailValidation) {
    if (currentUser) {
      if (currentUser.emailVerified) {
        if (currentUser.displayName) next('/direct')
        else next()
      } else {
        next('/confirm')
      }
    }
  } else if (isRequiredAuth) {
    if (currentUser) {
      if (currentUser.emailVerified) {
        if (currentUser.displayName) next('/direct')
        else next('/setup-profile')
      } else {
        next()
      }
    } else {
      next('/signin')
    }
  } else {
    if (currentUser) {
      if (currentUser.emailVerified) {
        if (currentUser.displayName) next('/direct')
        else next('/setup-profile')
      } else {
        next('/confirm')
      }
    } else {
      next()
    }
  }
}

export default validation
