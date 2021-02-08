<template>
  <div class="direct-message-wrapper">
    <div @click="sample" class="direct">
      ユーザー: {{otherUserName}}
    </div>
    <div class="comment-wrapper">
      <label for="chat"></label>
      <textarea ref="textarea" @input="onInputTextarea" name="chat" id="chat" rows="1" v-model="comment"></textarea>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'DirectMessage',
  data () {
    return {
      // isUserSelected: false,
      otherUserPhotoURL: '',
      otherUserName: '',
      comment: '',
      textFlag: 0
    }
  },
  created () {
  },
  mounted () {
    let uid = this.$route.params.uid
    let user = this.getUserInfo(uid)
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
      'getUsers',
      'getUserInfo'
    ]),
    getOtherUserIds () {
      let otherUserIds = Object.keys(this.getUsers).filter(uid => {
        return uid !== this.$currentUserId && this.getUserInfo(uid).emailVerified
      })
      return otherUserIds
    },
    userIds () {
      return Object.keys(this.getUsers)
    }
  },
  methods: {
    ...mapActions('chat/', [
      'sendChatData'
    ]),
    onClickUser (uid) {
      this.isUserSelected = true
      this.selectUserId = uid
      this.$router.push(`/direct/${uid}`)
    },
    sendChat () {
      let sendData = {
        type: 'direct',
        uid: this.$currentUserId,
        body: this.comment
      }
      this.sendChatData(sendData)
    },
    onInputTextarea (e) {
      console.log('e', e)
      console.log('e.target', e.target)
      // const height = this.$refs.textarea.scrollHeight
      // const textarea = this.$refs.textarea
      // const flag = Math.round((height - 3) / 24)
      // console.log('rows', this.$refs.textarea.rows)
      // console.log('flag', flag)
      // if (flag < 4) {
      //   textarea.rows = flag
      //   textarea.style.height = flag * 24 + 4
      // }
      // this.textareaFlag = height
    },
    sample () {
      // console.log('users', this.getUsers)
      // console.log('userIds', Object.keys(this.getUsers))
      // console.log('otheruserids', Object.keys(this.getUsers).filter(key => {
      //   return key !== this.$currentUserId && this.getUserInfo(key).emailVerified
      // }))
      console.log(this.$refs.textarea)
      console.log(this.comment)
      // console.log('tim', time)
    }
  }
}
</script>
