<template>
  <div class="container">
    <div class="wrapper">
      <p>入力されたメールアドレスに認証用URLを送信しました。</p>
      <p>メールアドレスを誤って登録した場合は、お手数をおかけしますが再登録をお願いします。</p>
      <p>※ その際は同じメールアドレスでは登録できません。</p>
    </div>
    <div class="btn-container">
      <button class='simple-btn' @click="onClickResendBtn">メール再送信</button>
      <button class='simple-btn' @click="onClickReregisterBtn">再登録する</button>
      <button class='simple-btn' @click="onClickConfirmBtn">確認したらここをクリック（更新）</button>
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
    onClickConfirmBtn () {
      this.$router.go({path: this.$router.currentRoute.path, force: true})
    },
    onClickResendBtn () {
      let currentUser = this.$currentUser
      currentUser.sendEmailVerification()
    },
    async onClickReregisterBtn () {
      await this.$firebase.auth().signOut()
      this.$router.go(-1) || this.$router.push('/signin')
    },
    sample () {
      console.log('clicked!!')
    }
  }
}
</script>

<style>
@import "../assets/scss/confirm.scss";

</style>
