<template>
  <div class="">
    <div class="user-select-wrapper bg-lightskyblue">
      <div class="user-select-title-wrapper">
        <span class="user-title">{{displayTitle}}</span>
        <span class="user-select-title">ユーザー選択</span>
        <input type="text" placeholder="ユーザー検索" v-model="searchParams">
      </div>
      <ul class="user-select-list">
        <template v-if="searchParams">
          <li v-for="uid of searchOtherUserIds(searchParams)" :key="uid.id" class="user-info-wrapper">
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
        </template>
        <template v-else>
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
        </template>
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
      searchParams: ''
    }
  },
  props: ['type'],
  computed: {
    ...mapGetters('users', [
      'getUsers',
      'getUserInfo',
      'getOtherUserIds',
      'searchOtherUserIds'
    ]),
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
