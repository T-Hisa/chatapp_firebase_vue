<template>
  <div class="container">
    <form class="wrapper form-container bg-skyblue" method="POST">
      <span class="title inner-wrapper">Sign Up</span>
      <!-- <div class="form-group form-wrapper">
        <label class="form-label" for="name">名前</label>
        <input class="form-control" id="name" type="text" v-model="name">
      </div> -->
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
import { mapActions } from 'vuex'
export default {
  name: 'Signup',
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
    ...mapActions('users/', [
      'registerProfileAction'
    ]),
    async onClickSignUp (e) {
      e.preventDefault()
      try {
        let { user } = await this.$firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        user.sendEmailVerification()
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
