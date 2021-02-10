<template>
  <div class="chat-whole-container">
    <div @click="sample" class="title-wrapper">
      ユーザー:
      <div class="user-wrapper">
        <img v-if="otherUserPhotoURL" v-bind:src="otherUserPhotoURL" alt="サムネイル">
        <img v-else src="../../assets/images/default.png" alt="サムネイル">
        <span class="name">{{otherUserName}}</span>
      </div>
    </div>
    <div class="chat-whole-wrapper">
      <div v-for="chat in getChatData" :key="chat.id">
        <chat-self v-if="isMe(chat)"
          v-bind:photoURL="photoURL"
          v-bind:uid="$currentUserId"
          v-bind:body="chat.body"
        />
        <chat-other v-else
          v-bind:photoURL="otherUserPhotoURL"
          v-bind:uid="otherUserId"
          v-bind:body="chat.body"
        />
      </div>
    </div>
    <chat-form
      v-bind:otherUserId="otherUserId"
      v-bind:type="'direct'"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ChatSelf from '@/components/ChatSelf'
import ChatOther from '@/components/ChatOther'
import ChatForm from '@/components/ChatForm'

export default {
  name: 'DirectMessage',
  data () {
    return {
      // isUserSelected: false,
      otherUserPhotoURL: '',
      otherUserName: '',
      otherUserId: '',
      comment: ''
    }
  },
  components: {
    ChatSelf,
    ChatOther,
    ChatForm
  },
  created () {
  },
  mounted () {
    let uid = this.$route.params.uid
    let user = this.getUserInfo(uid)
    this.otherUserId = uid
    if (user) {
      this.otherUserName = user.username
      this.otherUserPhotoURL = user.photoURL ? user.photoURL : ''
    }
  },
  updated () {
  },
  computed: {
    ...mapGetters('users', [
      'getUserInfo'
    ]),
    ...mapGetters('chat/', [
      'getDirectChatData'
    ]),
    getChatData () {
      let chatData = this.getDirectChatData(this.otherUserId)
      let chat = Object.keys(chatData).reverse().map(value => {
        return chatData[value]
      })
      return chat
    },
    photoURL () {
      let photoURL = (this.$currentUser && this.$currentUser.photoURL) ? this.$currentUser.photoURL : ''
      return photoURL
    }
  },
  methods: {
    isMe (chat) {
      return chat.which === 'me'
    },
    getPhotoURL (chat) {
      return chat.which === 'me' ? this.photoURL : this.otherUserPhotoURL
    },
    sample () {
      // console.log(this.$refs.textarea)
      // console.log(this.comment)
      // console.log('getChatData', this.getChatData())
      let chatData = this.getDirectChatData({ currentUid: this.$currentUserId, otherUid: this.otherUserId })
      console.log('chatData', chatData)
      let reverse = chatData.reverse()
      console.log('reverse', reverse)
      // console.log(this.getDirectChatData({ currentUid: this.$currentUserId, otherUid: this.otherUserId }))
    }
  }
}
</script>
