<template>
  <div class="direct-message-wrapper">
    <div @click="sample" class="direct">
      ユーザー: {{otherUserName}}
    </div>
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
    <div class="textarea-wrapper">
      <label for="chat"></label>
      <textarea class="chat-textarea" ref="textarea" @input="onInputTextarea" name="chat" id="chat" rows="1" v-model="comment"></textarea>
      <button @click="sendChat" class="btn btn-info chat-submit-btn">送信</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ChatSelf from '@/components/ChatSelf'
import ChatOther from '@/components/ChatOther'

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
    ChatOther
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
      console.log('user', user)
    } else {
    }
  },
  updated () {
    // console.log('updated')
  },
  computed: {
    ...mapGetters('users', [
      'getUserInfo'
    ]),
    ...mapGetters('chat/', [
      'getDirectChatData'
    ]),
    getChatData () {
      // return {}
      return this.getDirectChatData({ currentUid: this.$currentUserId, otherUid: this.otherUserId })
    },
    photoURL () {
      let photoURL = (this.$currentUser && this.$currentUser.photoURL) ? this.$currentUser.photoURL : ''
      return photoURL
    }
  },
  methods: {
    ...mapActions('chat/', [
      'sendChatData'
    ]),
    sendChat () {
      let sendData = {
        type: 'direct',
        uid: this.$currentUserId,
        partner: this.otherUserId,
        body: this.comment
      }
      this.sendChatData(sendData)
    },
    onInputTextarea () {
      const height = this.$refs.textarea.scrollHeight
      const textarea = this.$refs.textarea
      const flag = Math.round(height / 24)
      if (flag < 4) {
        textarea.style.height = 'auto'
        textarea.style.height = this.$refs.textarea.scrollHeight + 'px'
      }
    },
    chatClass (chat) {
      // return {}
      return chat.which === 'me' ? 'chat-me' : 'chat-other'
    },
    isMe (chat) {
      return chat.which === 'me'
    },
    getPhotoURL (chat) {
      return chat.which === 'me' ? this.photoURL : this.otherUserPhotoURL
    },
    sample () {
      // console.log(this.$refs.textarea)
      // console.log(this.comment)
      console.log(this.getDirectChatData({ currentUid: this.$currentUserId, otherUid: this.otherUserId }))
    }
  }
}
</script>
