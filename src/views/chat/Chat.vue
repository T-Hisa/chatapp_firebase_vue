<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>Sample Message</h1>
    <a href="#" @click="onClick"></a>
  </div>
</template>

<script>
export default {
  name: 'Chat',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted () {
    // console.log('Chat')
  },
  methods: {
    async onClick () {
    }
  }
}
</script>
