<template>
  <div class="container">
    <form class="wrapper form-container bg-skyblue" method="POST">
      <span class="title inner-wrapper">表示名</span>
      <div class="form-group form-wrapper">
        <label class="form-label" for="name">名前</label>
        <input class="form-control" id="name" type="text" v-model="name">
      </div>
      <div class="form-group form-wrapper">
        <label class="form-label" for="photoUrl">サムネイル(※ 設定しなくてもOK)</label>
        <input type="file" @change="sample" class="form-control" id="photoUrl">
      </div>
      <button class="btn btn-light border-dark border register-btn" v-on:click="onClickSetProfile">プロフィール設定</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'SetUpProfile',
  data () {
    return {
      photoUrl: '',
      name: ''
    }
  },
  created () {
  },
  mounted () {
    // console.log('this.firebase.auth() in Signup', this.$firebase.auth())
  },
  methods: {
    onClickSetProfile (e) {
      e.preventDefault()
      let currentUser = this.$firebase.auth().currentUser
      console.log('this.name', this.name)
      console.log('this.photoUrl', this.photoUrl)
      currentUser.updateProfile({
        displayName: this.name
      }).then(() => {
        this.$router.push('/home')
      }).catch(err => {
        console.log(err)
      })
      // try {
      //   await currentUser.updateProfile({
      //     displayname: this.name
      //   })
      //   // this.$router.push('/home')
      // } catch (e) {
      //   console.log('error', e)
      // }
    },
    sample (e) {
      console.log(e)
    }
  }
}
</script>
<style>
</style>
