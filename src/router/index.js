import Vue from 'vue'
import Router from 'vue-router'

import Container from '@/containers/Container'

import Home from '@/views/Home'
import ProfileUpdate from '@/views/ProfileUpdate'
import Group from '@/views/Group'
import SelectUser from '@/views/SelectUser'
import DirectMessage from '@/views/DirectMessage'
import NotifyContainer from '@/views/Notification'

import Signin from '@/views/Signin'
import Signup from '@/views/Signup'
import SetUpProfile from '@/views/SetUpProfile'
import Confirm from '@/views/Confirm'

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
        },
        {
          path: 'group',
          name: 'Group',
          component: Group
        },
        {
          path: '/direct',
          name: SelectUser,
          component: SelectUser
        },
        {
          path: '/direct/:uid',
          name: DirectMessage,
          component: DirectMessage
        },
        {
          path: '/notification',
          name: NotifyContainer,
          component: NotifyContainer
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
  console.log('routing start')
  validation(to, next)
})

export default router
