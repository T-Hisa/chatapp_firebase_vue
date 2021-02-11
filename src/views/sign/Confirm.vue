<template>
  <div class="container">
    <div class="wrapper">
      <p>{{$t('confirm.sent_mail_for_authentication')}}</p>
      <p>{{$t('confirm.begging_reregister')}}</p>
      <p>{{$t('confirm.mail_caution')}}</p>
    </div>
    <div class="btn-container">
      <button class='simple-btn' @click="onClickResendBtn">{{$t('confirm.resend_mail')}}</button>
      <button class='simple-btn' @click="onClickReregisterBtn">{{$t('confirm.action_reregister')}}</button>
      <button class='simple-btn' @click="onClickConfirmBtn">{{$t('confirm.begging_click')}}</button>
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
    }
  }
}
</script>
