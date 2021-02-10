<template>
  <div class="group-select-wrapper">
    <span class="group-title">グループ選択</span>
    <ul class="group-list-wrapper" v-if="getBelongGroupIds.length > 0">
      <li class="group-list" v-for="gid of getBelongGroupIds" :key="gid.id">
        <div data-bs-toggle="tooltip" data-bs-placement="top" v-bind:title="tooltipMessage(gid)" class="group-container">
          <div @click="onClickGroup(gid)" class="group-wrapper">
            <div class="group-name-wrapper">
              <span class="group-name-label">グループ名</span>
              <span class="group-name">{{ getGroupInfo(gid).groupName }}</span>
            </div>
            <div class="group-member-wrapper">
              <!-- <li v-for="memberId in getGroupMemberIds(gid)" :key="memberId.id">
                {{ getUserInfo(memberId).username }}
              </li> -->
              <span class="member-name-label">メンバーリスト</span>
              <span>{{displayMembersName(gid)}}</span>
            </div>
          </div>
          <button @click="onClickEditBtn(gid)" class="group-edit-btn btn btn-outline-dark">編集</button>
        </div>
      </li>
    </ul>
    <div class="group-title" v-else>所属しているグループはありません</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SelectGroup',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters('users', [
      'getUserInfo',
      'getUsersInfo'
    ]),
    ...mapGetters('groups', [
      'getGroupIds',
      'getGroupInfo'
    ]),
    getBelongGroupIds () {
      return this.getGroupIds.filter(groupId => {
        return Object.keys(this.getGroupInfo(groupId).memberIds).includes(this.$currentUserId)
      })
    }
  },
  methods: {
    onClickGroup (gid) {
      this.$router.push(`groupchat/${gid}`)
    },
    onClickEditBtn (gid) {
      console.log('clicked!!')
      this.$router.push({ name: `CreateGroup`, params: { gid: gid } })
    },
    getGroupMemberIds (gid) {
      return Object.keys(this.getGroupInfo(gid).memberIds)
    },
    getMembersName (gid) {
      const usersInfo = this.getUsersInfo(this.getGroupMemberIds(gid))
      return usersInfo.map(user => user.username)
    },
    tooltipMessage (gid) {
      const retVal = 'MEMBER: ' + this.getMembersName(gid)
      return retVal
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
    }
  }
}
</script>
