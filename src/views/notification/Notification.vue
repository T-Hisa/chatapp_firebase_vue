<template>
  <div class="notification-container">
    <template v-if="getUserNotification">
      <div v-for="nid in notificationIds" :key="nid.id">
        <div @click="onClickNotice(nid)" class="notification-wrapper">
          <div>
            <span class="display-name-in-notice">{{displayName(nid)}}</span>
            <span>{{displayWord(nid)}}</span>
          </div>
        </div>
      </div>
    </template>
    <div v-else class="no-notice">
      通知はありません。
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'NotifyContainer',
  data () {
    return {
    }
  },
  mounted () {
  },
  computed: {
    ...mapGetters('users', [
      'getUserInfo'
    ]),
    ...mapGetters('groups', [
      'getGroupInfo'
    ]),
    ...mapGetters('notifications', [
      'getUserNotification',
      'getNotificationDetail'
    ]),
    notificationIds () {
      return Object.keys((this.getUserNotification) || {})
    }
  },
  methods: {
    ...mapActions('notifications', [
      'removeNotifications'
    ]),
    getNotice (nid) {
      return this.getNotificationDetail(nid)
    },
    getGroupName (gid) {
      return this.getGroupInfo(gid) || {}
    },
    displayName (nid) {
      const notice = this.getNotice(nid)
      switch (notice.type) {
        case 'chat-direct':
          return this.getUserInfo(notice.fromId).username
        case 'chat-groups':
        case 'entry-group':
        case 'leave-group':
        case 'delete-group':
          return this.getGroupName(notice.fromId).groupName || ''
        default:
          return ''
      }
    },
    displayWord (nid) {
      const notice = this.getNotice(nid)
      switch (notice.type) {
        case 'chat-direct':
          return ' さんからチャットが届いています'
        case 'chat-groups':
          return ' でチャットがありました。'
        case 'entry-group':
          return ' のグループに参加しました。'
        case 'leave-group':
          return ' のグループから退出しました。'
        case 'delete-group':
          return ' のグループが削除されました。'
        default:
          return ''
      }
    },
    onClickNotice (nid) {
      const notice = this.getNotice(nid)
      console.log('Notice', notice)
      switch (notice.type) {
        case 'chat-direct':
          this.$router.push(`/direct/${notice.fromId}`)
          break
        case 'chat-groups':
        case 'entry-group':
          const group = this.getGroupInfo(notice.fromId)
          if (group.isDelete) {
            this.$router.push({name: 'SelectGroup', params: { groupName: group.groupName }})
          } else {
            this.$router.push(`/groupchat/${notice.fromId}`)
          }
          break
        case 'leave-grpup':
        case 'delete-group':
          this.$router.push('groups')
          break
        default:
          console.log('not match')
          break
      }
    }
  },
  destroyed () {
    const removeValue = {
      notificationIds: this.notificationIds,
      currentUid: this.$currentUserId
    }
    this.removeNotifications(removeValue)
  }
}
</script>
