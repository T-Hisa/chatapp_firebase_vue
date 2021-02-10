<template>
  <div class="container">
    <form class="form-container sign-form-container bg-skyblue" method="POST">
      <span class="title-sign">Sign In</span>
      <div class="form-group form-wrapper">
        <label class="form-label" for="email">Eメール</label>
        <input class="form-control" id="email" type="text" v-model="email">
      </div>
      <div class="form-group form-wrapper">
        <label class="form-label" for="password">パスワード</label>
        <input class="form-control" id="password" type="password" v-model="password">
      </div>
      <a class="btn btn-outline-dark register-btn" v-on:click="onClickSignIn">ログイン</a>
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
  created () {
  },
  mounted () {
  },
  computed: {
  },
  methods: {
    onClickSignIn (e) {
      e.preventDefault()
      this.$firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(userData => {
        const { user } = userData
        if (user.displayName) this.$router.push('/home')
        else if (user.emailVerified) this.$router.push('/setup-profile')
        else this.$router.push('/confirm')
      }).catch(e => {
        alert('ログインできませんでした')
      })
    }
  }
}
</script>
