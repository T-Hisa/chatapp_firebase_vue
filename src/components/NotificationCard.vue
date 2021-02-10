<template>
  <div class='notify-dropdown'>
    <div @click="onClickNotify" class="type-wrapper">
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
    ...mapGetters('groups', [
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
    onClickNotify () {
      switch (this.type) {
        case 'direct':
          this.$router.push(`/direct/${this.fromId}`)
          break
        case 'groups':
          this.$router.push(`/groupchat/${this.fromId}`)
          break
        default:
          return {}
      }
    }
  }
}
</script>
