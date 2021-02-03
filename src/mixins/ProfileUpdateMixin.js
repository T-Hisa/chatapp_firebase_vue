import { mapActions } from 'vuex'
const profileUpdate = {
  methods: {
    ...mapActions('users/', [
      'registerProfileAction'
    ]),
    updateProfile (value) {
      this.registerProfileAction(value)
      this.$currentUser.updateProfile({
        displayName: value.username
      }).then(() => {
        this.$router.push('/home')
      }).catch(err => {
        console.log(err)
      })
    }
  }
}

export default profileUpdate
