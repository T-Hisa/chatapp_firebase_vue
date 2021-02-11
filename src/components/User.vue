<template>
  <div @click="onClickUser(uid)">
    <div class="user-wrapper">
      <img v-if="getUserInfo(uid).photoURL" v-bind:src="getUserInfo(uid).photoURL" v-bind:alt="$t('utils.thumbnail')">
      <img v-else src="../assets/images/default.png" v-bind:alt="$t('utils.thumbnail')">
      <div class="user-info">
        {{ getUserInfo(uid).username }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'User',
  props: {
    uid: String
  },
  computed: {
    ...mapGetters('users', [
      'getUsers',
      'getUserInfo'
    ])
  },
  methods: {
    onClickUser (uid) {
      this.$router.push(`direct/${uid}`)
    }
  }
}
</script>
