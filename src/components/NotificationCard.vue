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
    let name = ''
    switch (this.type) {
      case 'chat-direct':
        name = this.getUserInfo(this.fromId).username
        this.displayWord = this.$t('notify.directchat_notify', {name})
        this.clickAction = () => this.$router.push(`direct/${this.fromId}`)
        break
      case 'chat-groups':
        name = this.getGroupInfo(this.fromId).groupName
        this.displayWord = this.$t('notify.groupchat_notify', {name})
        this.clickAction = () => this.$router.push(`groupchat/${this.fromId}`)
        break
      case 'entry-group':
        let group = this.getGroupInfo(this.fromId)
        name = group.groupName
        this.displayWord = this.$t('notify.entry_group_notify', {name})
        this.clickAction = group.isDeleted
          ? () => this.$router.push(`groupchat/${this.fromId}`)
          : () => this.$router.push({name: 'SelectGroup', params: { groupName: group.groupName }})
        break
      case 'leave-group':
        name = this.getGroupInfo(this.fromId).groupName
        this.displayWord = this.$t('notify.leave_group_notify', {name})
        this.clickAction = () => this.$router.push('groups')
        break
      case 'delete-group':
        group = this.getGroupInfo(this.fromId) || {}
        name = group.groupName || ''
        this.displayWord = this.$t('notify.delete_group_notify', {name})
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
