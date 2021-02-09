<template>
  <div class="container">
    <form class="wrapper form-container bg-skyblue" method="POST">
      <span class="title inner-wrapper">表示名</span>
      <div class="form-group form-wrapper">
        <label class="form-label" for="name">名前</label><span class="text-danger font-weight-bold" v-if="errorMessage">{{ errorMessage }}</span>
        <input @input="handleNameError" class="form-control" id="name" type="text" v-model="name">
      </div>
      <div class="form-group form-wrapper">
        <div>
          <label for="photoURL" style="font-weight: bold;" class="file-label">
            <i class="fas fa-portrait fa-2x" style="padding: 10px;"></i>
            <span style="margin: auto 0;">サムネイル設定（※ 設定しない場合は下のデフォルトのものになります。)</span>
          </label>
          <input type="file" accept="image/*" @change="onSelectProfilePhoto" id="photoURL" style="display: none;"/>
          <p class="img-wrapper">
            <span class="img-wrapper" v-if="imgUrl || originPhotoURL">
              <img v-if="imgUrl" v-bind:src="imgUrl" alt="サムネイル">
              <img v-else-if="originPhotoURL" v-bind:src="originPhotoURL" alt="サムネイル">
              <span class="reset-btn" v-on:click="onClickResetBtn">取り消し</span>
            </span>
            <img v-else src="../assets/images/default.png" alt="サムネイル" width="100px" height="100px" >
          </p>
        </div>
      </div>
      <div class="btn-wrapper">
        <button class="btn btn-light border-dark border profile-register-btn" v-on:click="onClickSetProfile">プロフィール設定</button>
      </div>
    </form>
  </div>
</template>

<script>
import { required, maxLength } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
import EventBus from '@/event'

export default {
  name: 'ChangeProfile',
  data () {
    return {
      originPhotoURL: '',
      photoURL: '',
      name: '',
      imgUrl: '',
      image: File,
      errorMessage: ''
    }
  },
  validations: {
    name: {
      required,
      maxLength: maxLength(8)
    }
  },
  created () {
  },
  mounted () {
    console.log('mounted!!')
    if (this.$currentUser) {
      this.name = this.$currentUser.displayName
      this.originPhotoURL = this.$currentUser.photoURL
    }
  },
  methods: {
    ...mapActions('users/', [
      'registerProfileAction'
    ]),
    onClickSetProfile (e) {
      e.preventDefault()
      if (this.$v.name.required && this.$v.name.maxLength) {
        if (this.imgUrl) {
          this.setPhotoUrl().then((url) => {
            this.photoURL = url
            this.updateProfileTask()
            window.URL.revokeObjectURL(this.imgUrl) // 一応ローカルで作成したURLを解放
          })
        } else {
          this.updateProfileTask()
        }
      } else {
        this.handleNameError()
      }
    },
    updateProfileTask () {
      let currentUserId = this.$currentUser.uid
      if (this.originPhotoURL && !this.photoURL) this.photoURL = this.originPhotoURL
      let updateValue = {
        uid: currentUserId,
        username: this.name,
        photoURL: this.photoURL
      }
      this.updateProfile(updateValue)
    },
    updateProfile (value) {
      this.registerProfileAction(value)
      let updateValue = {
        displayName: value.username,
        photoURL: value.photoURL
      }
      this.$currentUser.updateProfile(updateValue).then(() => {
        EventBus.$emit('redraw-flag')
        this.$router.push('/home')
      }).catch(err => {
        console.log(err)
      })
    },
    setPhotoUrl () {
      let [ baseFileName, fileType ] = this.image.name.split('.')
      let currentUserId = this.$currentUser.uid
      let metaData = {
        contentType: `image/${fileType}`
      }
      let saveFileName = `${baseFileName}-${currentUserId}.${fileType}`
      let storageRef = this.$firebase.storage().ref(`images/${currentUserId}/${saveFileName}`)
      return storageRef.put(this.image, metaData).then(snapshot => {
        console.log('snapshot', snapshot)
        return snapshot.ref.getDownloadURL()
      })
    },
    onClickResetBtn () {
      window.URL.revokeObjectURL(this.imgUrl)
      this.photoURL = null
      this.originPhotoURL = null
      this.imgUrl = null
    },
    handleNameError () {
      if (!this.$v.name.required) this.errorMessage = '入力してください'
      else if (!this.$v.name.maxLength) this.errorMessage = '8文字以内で入力してください'
      else this.errorMessage = ''
    },
    onSelectProfilePhoto (e) {
      if (this.image) window.URL.revokeObjectURL(this.imgUrl)
      let file = e.target.files[0]
      this.image = file
      this.imgUrl = window.URL.createObjectURL(file)
    }
  }
}
</script>
