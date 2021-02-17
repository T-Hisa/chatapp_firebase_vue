import router from './index'

const routeAroundSign = user => {
  if (user) {
    if (router.currentRoute.path !== '/direct') {
      if (user.displayName) router.push('/direct')
      else router.push('/setup-profile')
    }
  } else {
    if (router.currentRoute.path !== '/signin') router.push('/signin')
  }
}

export default routeAroundSign
