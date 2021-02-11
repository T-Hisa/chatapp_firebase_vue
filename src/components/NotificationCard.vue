<template>
  <div class='notify-dropdown'>
    <div @click="clickAction" class="type-wrapper">
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
      displayWord: '',
      clickAction: Function
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
    let fromName = ''
    switch (this.type) {
      case 'chat-irect':
        fromName = this.getUserInfo(this.fromId).username
        this.displayWord = fromName + ' さんからチャットが届いています。'
        this.clickAction = () => this.$router.push(`direct/${this.fromId}`)
        break
      case 'chat-groups':
        fromName = this.getGroupInfo(this.fromId).groupName
        this.displayWord = fromName + ' でチャットがありました。'
        this.clickAction = () => this.$router.push(`groupchat/${this.fromId}`)
        break
      case 'entry-group':
        fromName = this.getGroupInfo(this.fromId).groupName
        this.displayWord = fromName + ' のグループに参加しました。'
        this.clickAction = () => this.$router.push(`groupchat/${this.fromId}`)
        break
      case 'leave-group':
        fromName = this.getGroupInfo(this.fromId).groupName
        this.displayWord = fromName + ' のグループから退出しました。'
        this.clickAction = () => this.$router.push('groups')
        break
      case 'delete-group':
        const group = this.getGroupInfo(this.fromId) || {}
        fromName = group.groupName || ''
        this.displayWord = fromName + ' のグループが削除されました。'
        this.clickAction = () => this.$router.push('groups')
        break
      default:
        break
    }
  },
  updated () {
  },
  computed: {
    ...mapGetters('users', [
      'getUserInfo'
    ]),
    ...mapGetters('groups', [
      'getGroupInfo'
    ])
  },
  methods: {
  }
}
</script>
