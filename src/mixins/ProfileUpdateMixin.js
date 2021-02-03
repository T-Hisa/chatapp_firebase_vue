import { required, maxLength } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
const profileUpdate = {
  validations: {
    name: {
      required,
      maxLength: maxLength(20)
    }
  },
  methods: {
    ...mapActions('users/', [
      'registerProfileAction'
    ]),
    onClickSetProfile (e) {
      e.preventDefault()
      if (this.$v.name.required && this.$v.name.maxLength) {
        if (this.image) {
          this.setPhotoUrl().then((url) => {
            this.photoURL = url
            this.updateProfileTask()
            window.URL.revokeObjectURL(this.image) // 一応ローカルで作成したURLを解放
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
      let updateValue = {
        uid: currentUserId,
        username: this.name
      }
      if (this.photoURL) updateValue['photoURL'] = this.photoURL
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
      this.imgUrl = null
      window.URL.revokeObjectURL(this.image)
    },
    updateProfile (value) {
      this.registerProfileAction(value)
      this.$currentUser.updateProfile({
        displayName: value.username
      }).then(() => {
        this.$router.push('/home')
      }).catch(err => {
        console.log(err)
      })
    },
    handleNameError () {
      if (!this.$v.name.required) this.errorMessage = '入力してください'
      else if (!this.$v.name.maxLength) this.errorMessage = '20文字以内で入力してください'
      else this.errorMessage = ''
    },
    onSelectProfilePhoto (e) {
      if (this.image) window.URL.revokeObjectURL(this.image)
      let file = e.target.files[0]
      this.image = file
      this.imgUrl = window.URL.createObjectURL(file)
    }
  }
}

export default profileUpdate
