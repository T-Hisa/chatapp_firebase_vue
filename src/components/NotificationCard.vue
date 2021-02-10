<template>
  <div class='notify-dropdown'>
    <div class="type-wrapper">
      {{displayWord}}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NotificationCard',
  data () {
    return {
    }
  },
  props: {
    nid: String,
    fromId: String,
    type: String
  },
  created () {
  },
  mounted () {
  },
  updated () {
  },
  computed: {
    ...mapGetters('users', [
      'getUserInfo'
    ]),
    ...mapGetters('groups',[
      'getGroupInfo'
    ]),
    ...mapGetters('notifications', [
      'getUserNotification',
      'getNotificationDetail'
    ]),
    fromName () {
      switch (this.type) {
        case 'direct':
          return this.getUserInfo(this.fromId).username
        case 'groups':
          return this.getGroupInfo(this.fromId).groupName
        default:
          return ''
      }
    },
    displayWord () {
      const name = this.fromName
      switch (this.type) {
        case 'direct':
          return name + ' さんからチャットが届いています。'
        case 'groups':
          return name + ' でチャットがありました。'
        default:
          return ''
      }
    }
  },
  methods: {
    sample (nid) {
      console.log('notificationDetail', this.getNotificationDetail(nid))
    }
  }
}
</script>
