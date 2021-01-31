<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>Sample Message</h1>
    <a href="#" @click="onClick">sample</a>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted () {
    console.log('Home')
    console.log('currentUser in Home', this.$currentUser)
  },
  methods: {
    async onClick () {
    }
  }
}
</script>
