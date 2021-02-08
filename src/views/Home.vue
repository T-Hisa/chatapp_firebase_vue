<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>Welcome to our lab!</h1>
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
  },
  methods: {
    onClick (e) {
      e.preventDefault()
      this.$router.push('/profile-update')
      // this.sample()zsz
    }
    // sample () {
    //   var myNotification = new Notify('Yo dawg!', {
    //     body: 'This is an awesome notification',
    //     notifyShow: this.onNotifyShow
    //   });
    //   myNotification.show()
    // },
    // onNotifyShow () {
    //   console.log('notification')
    // }
  }
}
</script>
