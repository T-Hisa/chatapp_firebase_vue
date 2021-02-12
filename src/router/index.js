import Vue from 'vue'
import Router from 'vue-router'

import Container from '@/containers/Container'

import ProfileUpdate from '@/views/ProfileUpdate'

import SelectGroup from '@/views/chat/SelectGroup'
import GroupChat from '@/views/chat/GroupChat'
import SelectUser from '@/views/chat/SelectUser'
import DirectMessage from '@/views/chat/DirectMessage'

import CreateGroup from '@/views/group/CreateGroup'

import NotifyContainer from '@/views/notification/Notification'

// import UserInfo from '@/views/users/UserInfo'
// import UserDetail from '@/views/users/UserDetail'

import Signin from '@/views/sign/Signin'
import Signup from '@/views/sign/Signup'
import SetUpProfile from '@/views/sign/SetUpProfile'
import Confirm from '@/views/sign/Confirm'

import validation from './routingValidation'
// import Err from '@/containers/Error'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Container',
      redirect: '/direct',
      component: Container,
      meta: {
        isRequiredProfile: true // isRequiredProfile は プロフィール設定したユーザーのみを通す
      },
      children: [
        {
          path: 'direct',
          name: SelectUser,
          component: SelectUser
        },
        {
          path: '/profile-update',
          name: 'ProfileUpdate',
          component: ProfileUpdate
        },
        {
          path: 'groupchat',
          name: 'SelectGroup',
          component: SelectGroup
        },
        {
          path: 'groupchat/:gid',
          name: 'GroupChat',
          component: GroupChat
        },
        {
          path: 'direct/:uid',
          name: DirectMessage,
          component: DirectMessage
        },
        {
          path: 'notification',
          name: NotifyContainer,
          component: NotifyContainer
        },
        {
          path: 'creategroup',
          name: 'CreateGroup',
          component: CreateGroup
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
      redirect: '/direct'
    }
  ]
})

router.beforeEach((to, _, next) => {
  validation(to, next)
})

export default router
