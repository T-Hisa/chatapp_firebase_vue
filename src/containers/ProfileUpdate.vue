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
      <button class="btn btn-light border-dark border register-btn" v-on:click="onClickUpdateProfile">プロフィール設定</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ProfileUpdate',
  data () {
    return {
      name: '',
      photoUrl: ''
    }
  },
  created () {
    // console.log(this.authState)
  },
  mounted () {
    this.name = this.$currentUser.displayName
    this.photoUrl = this.$currentUser.photoURL
    console.log('mounted in ProfileUpdate', this.name, this.photoUrl)
  },
  methods: {
    async onClickUpdateProfile (e) {
      e.preventDefault()
      await this.$currentUser.updateProfile({
        displayName: this.name,
        photoURL: this.photoUrl
      })
      this.$router.go(-1) || this.$router.push('/home')
    },
    sample (e) {
      e.preventDefault()
      console.log(!!this.$router.go(-1))
    }
  }
}
</script>

<style>
.confirm-btn {
  height: 30px;
  padding: 3px 10px;
  margin-left: 10px;
}
.confirmation-form {
  margin-top: 50px;
  float: right;
}
.resend-form {
  float: right;
  margin-top: 40px;
}
</style>
