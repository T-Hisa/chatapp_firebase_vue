<template>
  <div class="notification-container">
    <template v-if="getUserNotification">
      <div v-for="nid in getNotificationIds" :key="nid.id">
        <div @click="onClickNotice(nid)" class="notification-wrapper">
          <div>
            <span>{{displayWord(nid)}}</span>
          </div>
        </div>
      </div>
    </template>
    <div v-else class="no-notice">
      {{$t('notify.no_notification')}}
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'NotifyContainer',
  computed: {
    ...mapGetters('users', [
      'getUserInfo'
    ]),
    ...mapGetters('groups', [
      'getGroupInfo'
    ]),
    ...mapGetters('notifications', [
      'getUserNotification',
      'getNotificationDetail',
      'getNotificationIds'
    ])
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
      let name = ''
      switch (notice.type) {
        case 'chat-direct':
          name = this.getUserInfo(notice.fromId).username
          return this.$t('notify.directchat_notify', {name})
        case 'chat-groups':
          name = this.getGroupName(notice.fromId).groupName || ''
          return this.$t('notify.groupchat_notify', {name})
        case 'entry-group':
          name = this.getGroupName(notice.fromId).groupName || ''
          return this.$t('notify.entry_group_notify', {name})
        case 'leave-group':
          name = this.getGroupName(notice.fromId).groupName || ''
          return this.$t('notify.leave_group_notify', {name})
        case 'delete-group':
          name = this.getGroupName(notice.fromId).groupName || ''
          return this.$t('notify.delete_group_notify', {name})
        default:
          return ''
      }
    },
    onClickNotice (nid) {
      const notice = this.getNotice(nid)
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
          this.$router.push('groupchat')
          break
        default:
          alert(this.$t('notify.happening_error'))
          break
      }
    }
  },
  destroyed () {
    const removeValue = {
      notificationIds: this.getNotificationIds,
      currentUid: this.$currentUserId
    }
    this.removeNotifications(removeValue)
  }
}
</script>
