<template>
  <div class="container">
    <form class="form-container sign-form-container bg-skyblue" method="POST">
      <span class="title-sign">{{$t('sign.sign_in')}}</span>
      <div class="form-group form-wrapper">
        <label class="form-label" for="email">{{$t('sign.e_mail')}}</label>
        <input class="form-control" id="email" type="text" v-model="email">
      </div>
      <div class="form-group form-wrapper">
        <label class="form-label" for="password">{{$t('sign.password')}}</label>
        <input class="form-control" id="password" type="password" v-model="password">
      </div>
      <a class="btn btn-outline-dark register-btn" v-on:click="onClickSignIn">{{$t('sign.sign_in')}}</a>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Signin',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    onClickSignIn (e) {
      e.preventDefault()
      this.$firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(userData => {
        const { user } = userData
        if (user.displayName) this.$router.push('/select-user')
        else if (user.emailVerified) this.$router.push('/setup-profile')
        else this.$router.push('/confirm')
      }).catch(e => {
        alert(this.$t('sign.cant_sign_in'))
      })
    }
  }
}
</script>
