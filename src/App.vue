<template>
  <div id="app">
    <top-view
      v-bind:is-path-signin="isPathSignin"
      :key="redrawFlag"
    />
    <router-view
      @redraw-flag="redrawTopView"
    />
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
      isPathSignin: false,
      redrawFlag: 0
    }
  },
  components: {
    // Sidebar,
    TopView
  },
  created () {
  },
  mounted () {
    this.isUserPropsSet = !!(this.$currentUser && this.$currentUser.displayName)
    this.isPathSignin = this.$route.name === 'Signin'
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
    }
  }
}

</script>
<style>
@import "./assets/scss/style.scss";
</style>
