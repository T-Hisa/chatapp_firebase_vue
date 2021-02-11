<template>
  <div class="">
    <div class="user-select-wrapper bg-lightskyblue">
      <span class="user-title">{{displayTitle}}</span>
      <span>ユーザー選択</span>
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
  name: 'UserSelect',
  data () {
    return {
    }
  },
  props: ['type'],
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
    },
    displayTitle () {
      return this.type === 'DM' ? 'ダイレクトメッセージ' : 'ユーザー情報'
    }
  },
  methods: {
    onClickUser (uid) {
      if (this.type === 'DM') {
        this.$router.push(`direct/${uid}`)
      } else {
        this.$router.push(`user-detail/${uid}`)
      }
    }
  }
}
</script>
