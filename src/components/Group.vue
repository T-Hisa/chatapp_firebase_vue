<template>
  <div data-bs-toggle="tooltip" data-bs-placement="top" v-bind:title="tooltipMessage(gid)" class="group-container">
    <div @click="onClickGroup(gid)" class="group-wrapper">
      <div class="group-name-wrapper">
        <span class="group-name-label">{{$t('groups.group_name')}}</span>
        <span class="group-name">{{ getGroupInfo(gid).groupName }}</span>
      </div>
      <div class="group-member-wrapper">
        <span class="member-name-label">{{$t('groups.member_list')}}</span>
        <span>{{displayMembersName(gid)}}</span>
      </div>
    </div>
    <div class="group-btn-wrapper">
      <button @click="onClickEditBtn(gid)" class="group-action-btn btn btn-outline-dark">{{$t('groups.edit')}}</button>
      <button @click="onClickDeleteBtn(gid)" class="group-action-btn btn btn-outline-dark">{{$t('groups.delete')}}</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Group',
  props: {
    'gid': String
  },
  computed: {
    ...mapGetters('users', [
      'getUserInfo',
      'getUsersInfo'
    ]),
    ...mapGetters('groups', [
      'getGroupInfo'
    ])
  },
  methods: {
    ...mapActions('groups', [
      'deleteGroup'
    ]),
    onClickGroup (gid) {
      this.$router.push(`groupchat/${gid}`)
    },
    onClickDeleteBtn (gid) {
      const groupName = this.getGroupInfo(gid).groupName
      const message = confirm(this.$t('groups.confirm_delete', { groupName }))
      if (message) {
        this.deleteGroup(gid)
      }
    },
    onClickEditBtn (gid) {
      this.$router.push({ name: `CreateGroup`, params: { gid: gid } })
    },
    getGroupMemberIds (gid) {
      return Object.keys(this.getGroupInfo(gid).memberIds).filter(uid => uid !== this.$currentUserId)
    },
    displayMembersName (gid) {
      let displayWord = ''
      const memberIds = this.getGroupMemberIds(gid)
      for (let memberId of memberIds) {
        const word = '・' + this.getUserInfo(memberId).username
        displayWord += word
        if (displayWord.length > 16) {
          displayWord += '...'
          break
        }
      }
      return displayWord
    },
    getMembersName (gid) {
      const usersInfo = this.getUsersInfo(this.getGroupMemberIds(gid))
      return usersInfo.map(user => user.username)
    },
    tooltipMessage (gid) {
      const retVal = 'MEMBER: ' + this.getMembersName(gid)
      return retVal
    }
  }
}
</script>
