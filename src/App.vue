<template>
  <div id="app">
    <top-view
      v-bind:is-path-signin="isPathSignin"
    />
    <router-view/>
  </div>
</template>

<script>
// import Sidebar from '@/components/Sidebar'
import TopView from '@/components/Top'

export default {
  name: 'App',
  data () {
    return {
      isPathSignin: false
    }
  },
  created () {
  },
  mounted () {
    this.isPathSignin = this.$route.name === 'Signin'
  },
  updated () {
    this.isPathSignin = this.$route.name === 'Signin'
  },
  components: {
    // Sidebar,
    TopView
  },
  methods: {
  }
}

</script>
<style>
@import "./assets/scss/style.scss";
</style>
