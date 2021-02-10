<template>
  <div class="notification-container">
    <template v-if="getUserNotification">
      <div v-for="nid in notificationIds" :key="nid.id">
        <div @click="onClickNotice(nid)" class="notification-wrapper">
          <div v-if="getType(nid) === 'direct'">
            <span class="display-name-in-notice">{{displayUserName(nid)}}</span>
            <span>さんからチャットが届いています。</span>
          </div>
          <div v-else>
            <span class="display-name-in-notice">{{displayGroupName(nid)}}</span>
            <span>でチャットがありました。</span>
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
    console.log('mounted in Notice')
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
    getType (nid) {
      const notice = this.getNotificationDetail(nid)
      return notice.type
    },
    displayUserName (nid) {
      const notice = this.getNotificationDetail(nid)
      const user = this.getUserInfo(notice.fromId)
      return user.username
    },
    displayGroupName (nid) {
      const notice = this.getNotificationDetail(nid)
      const group = this.getGroupInfo(notice.fromId)
      console.log('group', group)
      return group.groupName
    },
    onClickNotice (nid) {
      const notice = this.getNotificationDetail(nid)
      const {type} = notice
      switch (type) {
        case 'direct':
          this.$router.push(`/direct/${notice.fromId}`)
          break
        case 'groups':
          this.$router.push(`/groupchat/${notice.fromId}`)
          break
        default:
          console.log('not match')
          break
      }
    }
  },
  beforeDestroy () {
    const removeValue = {
      notificationIds: this.notificationIds,
      currentUid: this.$currentUserId
    }
    this.removeNotifications(removeValue)
  }
}
</script>
