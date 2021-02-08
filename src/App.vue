<template>
  <div id="app">
    <top-view
      v-bind:is-path-signin="isPathSignin"
      :key="redrawFlag"
    />
    <router-view
    />
    <div @click="sample">sample</div>
  </div>
</template>

<script>
// import Sidebar from '@/components/Sidebar'
import TopView from '@/components/Top'
import EventBus from '@/event'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  data () {
    return {
      isPathSignin: false,
      redrawFlag: 0
    }
  },
  components: {
    // Sidebar,
    TopView
  },
  computed: {
    ...mapGetters('users', [
      'getUsers',
      'getUserInfo'
    ])
  },
  created () {
  },
  mounted () {
    this.isUserPropsSet = !!(this.$currentUser && this.$currentUser.displayName)
    this.isPathSignin = this.$route.name === 'Signin'
    EventBus.$on('redraw-flag', () => {
      this.redrawFlag++
    })
  },
  updated () {
    this.isPathSignin = this.$route.name === 'Signin'
    this.isUserPropsSet = !!(this.$currentUser && this.$currentUser.displayName)
  },
  watch: {
  },
  methods: {
    redrawTopView () {
      this.redrawFlag++
    },
    sample () {
      console.log('getUsers', this.getUsers)
      for (let user in this.getUsers) {
        console.log('user', user)
        console.log('user.id', user.id)
        console.log('user.id', Object.keys(this.getUsers))
        console.log('userInfo', this.getUserInfo(user))
        console.log('userInfo.photoURL', this.getUserInfo(user).photoURL)
      }
    }
  }
}

</script>
<style lang="scss">
@import "./assets/scss/main";
// @import "./assets/scss/style";
</style>
