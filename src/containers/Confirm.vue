<template>
  <div class="container">
    <div class="wrapper">
      <p>入力されたメールアドレスに認証用URLを送信しました。</p>
      <p>メールアドレスを誤って登録した場合は、お手数をおかけしますが再登録をお願いします。</p>
      <p>※ その際は同じメールアドレスでは登録できません。</p>
    </div>
    <div class="re-register-btn">
      <a href="#" @click="onClickResendBtn">メール再送信</a>
    </div>
    <div class="re-register-btn">
      <a href="#" @click="onClickReregisterBtn">再登録する</a>
    </div>
    <div class="re-register-btn">
      <a href="#" @click="sample">サンプル</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Confirm',
  data () {
    return {
    }
  },
  created () {
    // console.log(this.authState)
  },
  mounted () {
    console.log('confirm mounteds')
  },
  methods: {
    async onClickConfirmBtn (e) {
      e.preventDefault()
    },
    onClickResendBtn (e) {
      e.preventDefault()
      let currentUser = this.$currentUser
      currentUser.sendEmailVerification().then(() => {
        this.$firebase.auth().onAuthStateChanged(user => {
          if (user.emailVerified) {
            this.$router.push('/home')
          }
        })
      })
      console.log('currentUser', this.$currentUser)
    },
    async onClickReregisterBtn (e) {
      e.preventDefault()
      await this.$firebase.auth().signOut()
      this.$router.go(-1) || this.$router.push('/signin')
    },
    sample (e) {
      e.preventDefault()
      console.log(!!this.$router.go(-1))
    }
  }
}
</script>

<style>
.confirm-btn {
  height: 30px;
  padding: 3px 10px;
  margin-left: 10px;
}
.confirmation-form {
  margin-top: 50px;
  float: right;
}
.resend-form {
  float: right;
  margin-top: 40px;
}
</style>
