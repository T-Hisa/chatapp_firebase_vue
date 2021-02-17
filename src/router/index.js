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

import Signin from '@/views/sign/Signin'
import Signup from '@/views/sign/Signup'
import SetUpProfile from '@/views/sign/SetUpProfile'

import validation from './routingValidation'

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
          path: '/profile-update',
          name: 'ProfileUpdate',
          component: ProfileUpdate
        },
        {
          path: 'direct',
          name: SelectUser,
          component: SelectUser
        },
        {
          path: 'direct/:uid',
          name: DirectMessage,
          component: DirectMessage
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
      path: '/setup-profile',
      name: 'SetUpProfile',
      component: SetUpProfile,
      meta: {
        isRequiredAuth: true // isRequiredEmailValidation は、ユーザ登録・メール認証を終えたユーザのみ通す
      }
    },
    {
      path: '*',
      redirect: '/direct'
    }
  ]
})

router.beforeEach((to, _, next) => {
  console.log('to', to)
  validation(to, next)
})

export default router
