<template>
  <div class="chat-whole-container">
    <div class="title-wrapper title-group">
      {{$t('chat.group')}}<span class="name group-name">{{getGroupName}}</span>
    </div>
    <div class="member-whole-wrapper">
      {{$t('chat.member')}}
      <ul class="member-wrapper">
        <li v-for="memberId in memberIds" :key="memberId.id" class="user-detail">
          <img v-if="getPhotoURL(memberId)" v-bind:src="getPhotoURL(memberId)" v-bind:alt="$t('utils.thumbnail')">
          <img v-else src="@/assets/images/default.png" v-bind:alt="$t('utils.thumbnail')">
          <div>{{ getUserName(memberId) }}</div>
        </li>
      </ul>
    </div>
    <div class="chat-whole-wrapper">
      <div v-for="chat in getChatData(gid)" :key="chat.id">
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
      group: {}
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
  },
  computed: {
    ...mapGetters('groups', [
      'getGroupInfo'
    ]),
    ...mapGetters('chat', [
      'getGroupChatData'
    ]),
    ...mapGetters('users', [
      'getUserInfo'
    ]),
    memberIds () {
      const group = this.group || {}
      return Object.keys(group.memberIds || {})
    },
    getGroupName () {
      const group = this.group || {}
      return group.groupName || ''
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
      return this.getUserInfo(uid) ? this.getUserInfo(uid).photoURL : null
    },
    getChatData (gid) {
      const chatData = this.getGroupChatData(gid)
      const chat = Object.keys((chatData || {})).reverse().map(value => chatData[value])
      return chat
    }
  }
}
</script>
