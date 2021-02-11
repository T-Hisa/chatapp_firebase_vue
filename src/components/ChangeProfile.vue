<template>
  <div class="container">
    <form class="wrapper sign-form-container form-container bg-skyblue" method="POST">
      <span class="title profile-title">{{$t(profile.set_profile)}}</span>
      <div class="form-group form-wrapper">
        <label class="form-label" for="name">{{$t(profile.name)}}</label><span class="text-danger font-weight-bold" v-if="errorMessage">{{ errorMessage }}</span>
        <input @input="handleNameError" class="form-control" id="name" type="text" v-model="name">
      </div>
      <div class="form-group form-wrapper">
        <div>
          <label for="photoURL" style="font-weight: bold;" class="file-label">
            <i class="fas fa-portrait fa-2x" style="padding: 10px;"></i>
            <span style="margin: auto 0;">{{$t(profile.set_thumbnail)}}
              <span v-if="!(isUpdate || imgUrl)">{{$t(profile.caution_default_thumbnail)}}</span>
            </span>
          </label>
          <input type="file" accept="image/*" @change="onSelectProfilePhoto" id="photoURL" style="display: none;"/>
          <p class="img-wrapper">
            <span class="img-wrapper" v-if="imgUrl || originPhotoURL">
              <img v-if="imgUrl" v-bind:src="imgUrl" v-bind:alt="$t('utils.thumbnail')">
              <img v-else-if="originPhotoURL" v-bind:src="originPhotoURL" v-bind:alt="$t('utils.thumbnail')">
              <span class="reset-btn" v-on:click="onClickResetBtn">{{$t(profile.cancel)}}</span>
            </span>
            <img v-else src="../assets/images/default.png" v-bind:alt="$t('utils.thumbnail')" width="100px" height="100px" >
          </p>
        </div>
      </div>
      <div class="btn-wrapper">
        <button class="btn btn-light border-dark border profile-register-btn" v-on:click="onClickSetProfile">{{$t(profile.set_profile)}}</button>
      </div>
    </form>
  </div>
</template>

<script>
import { required, maxLength } from 'vuelidate/lib/validators'
import { mapActions, mapGetters } from 'vuex'
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
      errorMessage: '',
      photoRef: ''
    }
  },
  props: {
    'isUpdate': {
      type: Boolean,
      default: false
    }
  },
  validations: {
    name: {
      required,
      maxLength: maxLength(8)
    }
  },
  mounted () {
    if (this.$currentUser) {
      this.name = this.$currentUser.displayName
      this.originPhotoURL = this.$currentUser.photoURL
    }
  },
  computed: {
    ...mapGetters('users/', [
      'getUserInfo'
    ])
  },
  methods: {
    ...mapActions('users/', [
      'registerProfile'
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
      updateValue['photoURL'] = this.photoURL || null
      updateValue['photoRef'] = this.photoRef || null
      this.registerProfile(updateValue)
      this.updateProfile(updateValue)
    },
    updateProfile (value) {
      let updateValue = {
        displayName: value.username,
        photoURL: value.photoURL
      }
      this.$currentUser.updateProfile(updateValue).then(() => {
        EventBus.$emit('redraw-flag')
        this.$router.push('/select-user')
      }).catch(err => {
        console.log(err)
        alert('予期せぬエラーが発生しました。ご一報ください')
      })
    },
    setPhotoUrl () {
      const [ baseFileName, fileType ] = this.image.name.split('.')
      const currentUserId = this.$currentUser.uid
      const metaData = {
        contentType: `image/${fileType}`
      }
      const saveFileName = `${baseFileName}-${currentUserId}.${fileType}`
      this.photoRef = `images/${currentUserId}/${saveFileName}`
      const storageRef = this.$firebase.storage().ref(this.photoRef)
      const promises = []
      promises.push(storageRef.put(this.image, metaData))
      const photoRef = this.getUserInfo(this.$currentUserId).photoRef
      if (photoRef) {
        const deleteStorageRef = this.$firebase.storage().ref(photoRef)
        promises.push(deleteStorageRef.delete())
      }
      return Promise.all(promises).then(retVal => {
        return retVal[0].ref.getDownloadURL()
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
