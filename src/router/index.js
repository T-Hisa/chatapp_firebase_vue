import Vue from 'vue'
// import firebase from '../firebase-init'
import Router from 'vue-router'
import Container from '@/containers/Container'
import Home from '@/containers/Home'
import Signin from '@/containers/Signin'
import Signup from '@/containers/Signup'
import Confirm from '@/containers/Confirm'
import SetUpProfile from '@/containers/SetUpProfile'
import ProfileUpdate from '@/containers/ProfileUpdate'

import validation from './routingValidation'
// import Err from '@/containers/Error'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Container',
      redirect: '/home',
      component: Container,
      meta: {
        isRequiredProfile: true // isRequiredProfile は プロフィール設定したユーザーのみを通す
      },
      children: [
        {
          path: '/home',
          name: 'Home',
          component: Home
        },
        {
          path: '/profile-update',
          name: 'ProfileUpdate',
          component: ProfileUpdate
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
        isRequiredAuth: true // isRequiredAuth は ユーザー登録(but yet メール認証) のユーザのみ通す
      }
    },
    {
      path: '/setup-profile',
      name: 'SetUpProfile',
      component: SetUpProfile,
      meta: {
        isRequiredEmailValidation: true // isRequiredEmailValidation は、ユーザ登録・メール認証を終えたユーザのみ通す
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
  console.log({to})
  validation(to, next)
})

export default router
