<template>
  <div class="container">
    <form class="wrapper form-container bg-skyblue" method="POST">
      <span class="title inner-wrapper">表示名</span>
      <div class="form-group form-wrapper">
        <label class="form-label" for="name">名前</label>
        <input class="form-control" id="name" type="text" v-model="name">
      </div>
      <div class="form-group form-wrapper">
        <label style="font-weight: bold;" for="photoURL">サムネイル（※ 設定しない場合は下のデフォルトのものになります。)</label>
        <p>
          <input type="file" accept="image/*" @change="sample" id="photoURL" />
          <img src="../assets/images/default.jpg" alt="サムネイル" width="100px" height="100px" >
        </p>
      </div>
      <button class="btn btn-light border-dark border register-btn" v-on:click="onClickSetProfile">プロフィール設定</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import PofileUpdateMixin from '@/mixins/ProfileUpdateMixin'

export default {
  name: 'SetUpProfile',
  data () {
    return {
      photoURL: null,
      name: '',
      flag: false
    }
  },
  created () {
  },
  mounted () {
    // console.log('this.firebase.auth() in Signup', this.$firebase.auth())
  },
  mixins: [
    PofileUpdateMixin
  ],
  methods: {
    ...mapActions('users/', [
      'registerProfileAction'
    ]),
    onClickSetProfile (e) {
      e.preventDefault()
      let currentUserId = this.$currentUser.uid
      let updateValue = {
        uid: currentUserId,
        username: this.name,
        photoURL: this.photoURL
      }
      this.updateProfile(updateValue)
      // this.registerProfileAction(updateValue)
      // this.$currentUser.updateProfile({
      //   displayName: this.name
      // }).then(() => {
      //   this.$router.push('/home')
      // }).catch(err => {
      //   console.log(err)
      // })
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
      // e.target.files[0].name
      // let file = e.target.files[0]
      // let blobUrl = window.URL.createObjectURL(file);
      // // let imgEl = $('#uploaded-image')[0];
      // imgEl.src = blobUrl;
      let currentUserId = this.$currentUser.uid
      // const storageRef = this.$firebase.storage().ref()
      let [ baseFileName, fileType ] = e.target.files[0].name.split('.')
      let saveFileName = `${baseFileName}-${currentUserId}.${fileType}`
      // let saveFileName = baseFileName +
      // storageRef.child(`images`)
      console.log(e)
      console.log(e.target.files)
      // console.log(e.target.files[0].name.split('.').splice(1, 0, uid).join('.'))
      console.log(saveFileName)
    }
  }
}
</script>

<style>
.none-display {
  display: none;
}
</style>
