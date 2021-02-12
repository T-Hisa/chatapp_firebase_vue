<template>
  <div class="chat-whole-container">
    <div class="title-wrapper">
      {{$t('chat.user')}}
      <div class="user-wrapper">
        <img v-if="otherUserPhotoURL" v-bind:src="otherUserPhotoURL" v-bind:alt="$t('utils.thumbnail')">
        <img v-else src="@/assets/images/default.png" v-bind:alt="$t('utils.thumbnail')">
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
  mounted () {
    let uid = this.$route.params.uid
    let user = this.getUserInfo(uid)
    this.otherUserId = uid
    if (user) {
      this.otherUserName = user.username
      this.otherUserPhotoURL = user.photoURL ? user.photoURL : ''
    }
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
    }
  }
}
</script>
