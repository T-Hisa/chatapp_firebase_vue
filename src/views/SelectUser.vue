<template>
  <div class="">
    <div class="user-select-wrapper bg-lightskyblue">
      ユーザー選択
      <ul class="user-select-list">
        <li v-for="uid of getOtherUserIds" :key="uid.id" class="user-info-wrapper">
          <div @click="onClickUser(uid)">
            <div class="user-wrapper">
              <img v-if="getUserInfo(uid).photoURL" v-bind:src="getUserInfo(uid).photoURL" alt="サムネイル">
              <img v-else src="../assets/images/default.png" alt="サムネイル">
              <div class="user-info">
                {{ getUserInfo(uid).username }}
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Direct',
  data () {
    return {
      isUserSelected: false,
      selectUserId: ''
      // user: {
      //   photoURL:
      // }
    }
  },
  mounted () {
  },
  computed: {
    ...mapGetters('users', [
      'getUsers',
      'getUserInfo'
    ]),
    getOtherUserIds () {
      let otherUserIds = Object.keys(this.getUsers).filter(uid => {
        return uid !== this.$currentUserId && this.getUserInfo(uid).emailVerified
      })
      return otherUserIds
    },
    userIds () {
      return Object.keys(this.getUsers)
    }
    // userPhotoURL (id) {
    //   return getUserInfo(id).photoURL
    // }
    // isUserSelected: {
    //   get () {
    //     return this._isUserSelected
    //   },
    //   set (value) {

    //   }
    // }
  },
  methods: {
    onClickUser (uid) {
      console.log('uid', uid)
      this.isUserSelected = true
      this.selectUserId = uid
      this.$router.push(`/direct/${uid}`)
    },
    sample () {
      console.log('users', this.getUsers)
      console.log('userIds', Object.keys(this.getUsers))
      console.log('otheruserids', Object.keys(this.getUsers).filter(key => {
        return key !== this.$currentUserId && this.getUserInfo(key).emailVerified
      }))
      // let otherUserIds = Object.keys(this.getUsers).filter(uid => uid !== this.$currentUserId)
      // otherUserIds.map(val => {
      //   console.log(val)
      // })
      // console.log('otherverifieduserids', this.getUsers.map(val => {
      //   console.log(val)
      //   return val
      // }))
      // for (let uid in Object.keys(this.getUsers)) {
      //   console.log('uid', uid)
      // }
    }
  }
}
</script>
