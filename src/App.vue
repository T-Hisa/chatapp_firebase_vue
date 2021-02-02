<template>
  <div id="app">
    <top-view
      v-bind:is-user-signin="isUserSignin"
      v-bind:is-path-signin="isPathSignin"
    />
    <router-view/>
    <div @click="sample">sample</div>
  </div>
</template>

<script>
// import Sidebar from '@/components/Sidebar'
import TopView from '@/components/Top'

export default {
  name: 'App',
  data () {
    return {
      isUserSignin: false,
      isPathSignin: false,
      passPassword: ''
    }
  },
  created () {
  },
  mounted () {
    console.log('mounted in App')
    this.isPathSignin = this.$route.name === 'Signin'
  },
  updated () {
    this.isPathSignin = this.$route.name === 'Signin'
    console.log('update in App')
  },
  components: {
    // Sidebar,
    TopView
  },
  methods: {
    sample () {
      console.log('now invoke hello-world function!')
      let firebaseFunctions = this.$firebase.functions()
      let addMessage = firebaseFunctions.httpsCallable('addMessage')
      addMessage({ sample: 'sample' }).then(val => {
        console.log(val)
      }).catch(err => {
        console.log('error', err)
      })
    }
  }
}

</script>
<style>
@import "./assets/scss/style.scss";
</style>
