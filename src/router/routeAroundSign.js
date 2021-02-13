import router from './index'

const routeAroundSign = user => {
  console.log('currentRoute', router.currentRoute)
  if (user) {
    if (router.currentRoute.path !== '/direct') {
      if (user.displayName) router.push('/direct')
      else if (user.emailVerified) router.push('/setup-profile')
      else router.push('/confirm')
    }
  } else {
    if (router.currentRoute.path !== '/signin') router.push('/signin')
  }
}

export default routeAroundSign
