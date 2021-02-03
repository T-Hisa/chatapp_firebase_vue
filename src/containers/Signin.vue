<template>
  <div class="container">
    <form class="wrapper form-container bg-skyblue" method="POST">
      <span class="title inner-wrapper">Sign In</span>
      <div class="form-group form-wrapper">
        <label class="form-label" for="email">Eメール</label>
        <input class="form-control" id="email" type="text" v-model="email">
      </div>
      <div class="form-group form-wrapper">
        <label class="form-label" for="password">パスワード</label>
        <input class="form-control" id="password" type="password" v-model="password">
      </div>
      <button class="btn btn-light border-dark border register-btn" v-on:click="onClickSignIn">ログイン</button>
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
  methods: {
    async onClickSignIn (e) {
      e.preventDefault()
      try {
        let { user } = await this.$firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        if (user.displayName) this.$router.push('/home')
        else if (user.emailVerified) this.$router.push('/setup-profile')
        else this.$router.push('/confirm')
      } catch (e) {
        console.log('Error', e)
      }
    }
  }
}
</script>
<style>
</style>
