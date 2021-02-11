<template>
  <div id="app">
    <top-view
      v-bind:is-path-signin="isPathSignin"
      :key="redrawFlag"
      ref="top"
    />
    <div @click="handleClickEvent">
      <router-view
      />
    </div>
  </div>
</template>

<script>
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
    TopView
  },
  computed: {
    ...mapGetters('users', [
      'getUsers',
      'getUserInfo'
    ])
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
  methods: {
    redrawTopView () {
      this.redrawFlag++
    },
    handleClickEvent () {
      if (this.$refs.top.dropdownFlag) {
        this.$refs.top.onClickDropdown()
      }
    }
  }
}

</script>
<style lang="scss">
@import "./assets/scss/main";
</style>
