<template>
  <div class="chat-whole-container">
    <div class="title-wrapper title-group">
      グループ: <span class="name group-name">{{group.groupName}}</span>
    </div>
    <div class="member-whole-wrapper">
      メンバー:
      <ul class="member-wrapper">
        <li v-for="memberId in memberIds" :key="memberId.id" class="user-detail">
          <img v-if="getPhotoURL(memberId)" v-bind:src="getPhotoURL(memberId)" alt="サムネイル">
          <img v-else src="../../assets/images/default.png" alt="サムネイル">
          <div @click="sample(memberId)">{{ getUserName(memberId) }}</div>
        </li>
      </ul>
    </div>
    <div class="chat-whole-wrapper">
      <div v-for="chat in getGroupChatData(gid)" :key="chat.id">
        <chat-self v-if="isMe(chat)"
          v-bind:photoURL="getPhotoURL(chat.uid)"
          v-bind:uid="chat.uid"
          v-bind:body="chat.body"
        />
        <chat-other v-else
          v-bind:photoURL="getPhotoURL(chat.uid)"
          v-bind:uid="chat.uid"
          v-bind:body="chat.body"
        />
      </div>
    </div>
    <chat-form
      v-bind:groupId="gid"
      v-bind:type="'group'"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ChatSelf from '@/components/ChatSelf'
import ChatOther from '@/components/ChatOther'
import ChatForm from '@/components/ChatForm'

export default {
  name: 'GroupChat',
  data () {
    return {
      gid: '',
      group: {
        groupName: '',
        memberIds: []
      },
      members: []
    }
  },
  components: {
    ChatSelf,
    ChatOther,
    ChatForm
  },
  mounted () {
    this.gid = this.$route.params.gid
    this.group = this.getGroupInfo(this.gid)
    const memberIds = Object.keys(this.group.memberIds)
    this.members = this.getUsersInfo(memberIds)
    console.log('group', this.group)
  },
  computed: {
    ...mapGetters('groups', [
      'getGroupInfo'
    ]),
    ...mapGetters('chat', [
      'getGroupChatData'
    ]),
    ...mapGetters('users', [
      'getUsersInfo',
      'getUserInfo'
    ]),
    memberIds () {
      console.log('memberIds', Object.keys(this.group.memberIds))
      return Object.keys(this.group.memberIds)
    }
  },
  methods: {
    isMe (chat) {
      return chat.uid === this.$currentUserId
    },
    getUserName (uid) {
      return this.getUserInfo(uid).username
    },
    getPhotoURL (uid) {
      console.log('userInfo', this.getUserInfo(uid))
      return this.getUserInfo(uid) ? this.getUserInfo(uid).photoURL : null
    },
    sample (member) {
      console.log('user', member)
    }
  }
}
</script>
