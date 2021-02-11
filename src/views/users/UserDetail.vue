<template>
  <div class="user-detail-container bg-skyblue">
    <div class="user-profile-title">
      プロフィール
    </div>
    <div class="user-profile-name">
      表示名:<span class="user-display-name">{{username}}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'UserDetail',
  data () {
    return {
      username: '',
      email: '',
      photoURL: ''
    }
  },
  mounted () {
    const uid = this.$route.params.uid
    const user = this.getUserInfo(uid)
    this.username = user.username
    this.email = user.email
    this.photoURL = user.photoURL
  },
  components: {
  },
  computed: {
    ...mapGetters('users', [
      'getUserInfo',
    ])
  }
}
</script>
