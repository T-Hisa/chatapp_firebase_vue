import Vue from 'vue'
// import firebase from '../firebase-init'
import Router from 'vue-router'
import Container from '@/containers/Container'
import Home from '@/containers/Home'
import Signin from '@/containers/Signin'
import Signup from '@/containers/Signup'
import Confirm from '@/containers/Confirm'
import SetUpProfile from '@/containers/SetUpProfile'
import validation from './routingValidation'
// import Err from '@/containers/Error'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Container',
      // redirect: '/',
      component: Container,
      meta: {
        isRequiredProfile: true
      },
      children: [
        {
          path: '/home',
          name: 'Home',
          component: Home
        }
      ]
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/confirm',
      name: 'Confirm',
      component: Confirm,
      meta: {
        isRequiredEmailValidation: true
      }
    },
    {
      path: '/setup-profile',
      name: 'SetUpProfile',
      component: SetUpProfile,
      meta: {
        isRequiredAuth: true
      }
    },
    {
      path: '*',
      redirect: ''
    }
    // {
    //   path: '*',
    //   name: 'Error',
    //   component: Err
    // }
  ]
})

router.beforeEach((to, _, next) => {
  validation(to, next)
})

export default router
