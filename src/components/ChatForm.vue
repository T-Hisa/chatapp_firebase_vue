<template>
  <div class="chat-form-container">
    <label v-if="errorMessage" class="text-danger label-text" for="chat">{{errorMessage}}</label>
    <!-- <label for="chat"></label> -->
    <div class="chat-form-wrapper">
      <textarea class="chat-form" ref="textarea" @input="onInputTextarea" name="chat" id="chat" rows="1" v-model="comment"></textarea>
      <button @click="onClickSendBtn" class="btn btn-info chat-submit-btn">送信</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'ChatSelf',
  data () {
    return {
      comment: '',
      errorMessage: ''
    }
  },
  validations: {
    comment: {
      required
    }
  },
  props: {
    otherUserId: String,
    groupId: String,
    type: String
  },
  methods: {
    ...mapActions('chat/', [
      'sendChatData'
    ]),
    onInputTextarea () {
      const height = this.$refs.textarea.scrollHeight
      const textarea = this.$refs.textarea
      const flag = Math.round(height / 24)
      if (flag < 4) {
        textarea.style.height = 'auto'
        textarea.style.height = this.$refs.textarea.scrollHeight + 'px'
      }
    },
    onClickSendBtn () {
      if (this.$v.comment.required) {
        let sendData = {
          type: this.type,
          uid: this.$currentUserId,
          body: this.comment
        }
        if (this.otherUserId) sendData['partner'] = this.otherUserId
        if (this.groupId) sendData['gid'] = this.groupId
        this.sendChatData(sendData)
        this.comment = ''
        // const textarea = this.$refs.textarea
        this.$refs.textarea.style.height = 'auto'
        // this.$refs.textarea.style.height = 'auto'
      } else {
        this.handleCommentError()
      }
    },
    handleCommentError () {
      if (!this.$v.comment.required) this.errorMessage = '入力してください'
    }
  }
}
</script>
