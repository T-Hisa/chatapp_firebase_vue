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
            <span class="img-wrapper" v-if="imgUrl">
              <img v-bind:src="imgUrl" alt="サムネイル">
              <span class="reset-btn" v-on:click="onClickResetBtn">取り消し</span>
            </span>
            <img v-else src="../assets/images/default.jpg" alt="サムネイル" width="100px" height="100px" >
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

export default {
  name: 'ChangeProfile',
  data () {
    return {
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
      maxLength: maxLength(20)
    }
  },
  created () {
  },
  mounted () {
    console.log('mounted!!')
    if (this.$currentUser) {
      this.name = this.$currentUser.displayName
      this.imgUrl = this.$currentUser.photoURL
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
    updateProfile (value) {
      this.registerProfileAction(value)
      console.log('photoURL', value.photoURL)
      this.$currentUser.updateProfile({
        displayName: value.username,
        photoURL: value.photoURL
      }).then(() => {
        this.$emit('redraw-flag')
        this.$router.push('/home')
        // 遅くなってしまうが、Top の描画の変更がされないので下記のように実装
        // this.$router.go({path: this.$router.currentRoute.path, force: true})
      }).catch(err => {
        console.log(err)
      })
    },
    updateProfileTask () {
      let currentUserId = this.$currentUser.uid
      let updateValue = {
        uid: currentUserId,
        username: this.name,
        photoURL: this.photoURL
      }
      // if (this.photoURL) {
      //   updateValue['photoURL'] = this.photoURL
      // }
      this.updateProfile(updateValue)
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
      this.photoURL = ''
      this.imgUrl = null
    },
    handleNameError () {
      if (!this.$v.name.required) this.errorMessage = '入力してください'
      else if (!this.$v.name.maxLength) this.errorMessage = '20文字以内で入力してください'
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

<style>
.file-label {
  display: flex;
  cursor: pointer;
  justify-content: center;
}

.none-display {
  display: none;
}

.profile-register-btn {
  margin: 0 auto 20px auto;
}

.img-wrapper {
  display: flex;
  justify-content: center;
}

.img-wrapper img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 10px;
}

.btn-wrapper {
  display: flex;
}

.reset-btn {
  margin: auto 0;
  margin-left: 10px;
}

.reset-btn:hover {
  cursor: pointer;
}

</style>
