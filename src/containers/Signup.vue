<template>
  <div class="container">
    <form class="wrapper form-container bg-skyblue" method="POST">
      <span class="title inner-wrapper">Sign Up</span>
      <div class="form-group form-wrapper">
        <label class="form-label" for="name">名前</label>
        <input class="form-control" id="name" type="text" v-model="name">
      </div>
      <div class="form-group form-wrapper">
        <label class="form-label" for="email">Eメール</label>
        <input class="form-control" id="email" type="text" v-model="email">
      </div>
      <div class="form-group form-wrapper">
        <label class="form-label" for="password">パスワード</label>
        <input class="form-control" id="password" type="password" v-model="password">
      </div>
      <button class="btn btn-light border-dark border register-btn" v-on:click="onClickSignUp">登録</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Signup',
  data () {
    return {
      email: '',
      name: '',
      password: ''
    }
  },
  created () {
  },
  mounted () {
    console.log('this.firebase.auth() in Signup', this.$firebase.auth())
  },
  methods: {
    onClickSendBtn (e) {
      e.preventDefault()
    },
    async onClickSignUp (e) {
      e.preventDefault()
      console.log('this.name', this.name)
      try {
        await this.$firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        this.$router.push('/confirm')
      } catch (e) {
        console.log('error', e)
      }
    }
  }
}
</script>
<style>
</style>
