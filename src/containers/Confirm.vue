<template>
  <div class="container">
    <div class="wrapper">
      <p>入力されたメールアドレスに認証用URLを送信しました。</p>
      <p>メールアドレスを誤って登録した場合は、お手数をおかけしますが再登録をお願いします。</p>
      <p>※ 同じメールアドレスでは登録できません。</p>
      <!-- <p>※画面遷移せずにメールをご確認ください。</p> -->
      <!-- <div class="form-group confirmation-form">
        <label for="code">認証コード</label>
        <input id="code" type="text" v-model="code">
        <button class="btn btn-light border-dark confirm-btn" @click="onClickConfirmBtn">認証</button>
      </div> -->
      <!-- <div class="resend-form">
        <label for="name">登録した名前: </label>
        <input id="name" type="text" v-model="username">
        <a href="#" @click="onClickResendBtn">コード再送</a>
      </div> -->
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
      code: '',
      username: '',
      password: '',
      isMemorizePassword: false
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
