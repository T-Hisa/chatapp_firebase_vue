<template>
  <div class="container">
    <form class="sign-form-container form-container bg-skyblue" method="POST">
      <span class="title-sign">Sign Up</span>
      <div class="form-group form-wrapper">
        <label class="form-label" for="email">Eメール
          <span v-if="computedEmailEmpty" class="text-danger label-text">※Eメールを入力してください</span>
          <span v-else-if="!computedValidEmail" class="text-danger label-text">※Eメールを正しい形式で入力してください</span>
        </label>
        <input class="form-control" id="email" type="text" v-model="email">
      </div>
      <div class="form-group form-wrapper">
        <label class="form-label" for="password">パスワード
          <span v-if="!registerablePassword" class="text-danger label-text">※パスワードは6文字以内で入力してください</span>
        </label>
        <input class="form-control" id="password" type="password" v-model="password">
      </div>
      <a class="btn btn-outline-dark register-btn" v-bind:class="{disabled: disableJudge}" v-on:click="onClickSignUp">登録</a>
    </form>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'Signup',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  validations: {
    password: {
      required,
      minLength: minLength(6)
    }
  },
  computed: {
    computedValidEmail () {
      return !!this.email.match(/^[\w+\-.]+@[a-z\d\-.]+\.[a-z]+$/i)
    },
    computedEmailEmpty () {
      return !this.email
    },
    registerableEmail () {
      return !this.computedEmailEmpty && this.computedValidEmail
    },
    disableJudge () {
      const flag = !(this.registerableEmail && this.registerablePassword)
      return flag
    },
    registerablePassword () {
      return this.$v.password.required && this.$v.password.minLength
    }
  },
  methods: {
    onClickSignUp (e) {
      e.preventDefault()
      if (this.registerableEmail && this.registerablePassword) {
        this.$firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(userData => {
          userData.user.sendEmailVerification()
          this.$router.push('/confirm')
        }).catch(e => {
          alert('このメールアドレスは既に登録されています')
        })
      }
    }
  }
}
</script>
