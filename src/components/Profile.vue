<template>
  <div class="nav-link profile-container">
    <router-link class="none-style" :to='"/profile-update"'>
      <img v-if="photoURL" v-bind:src="photoURL" alt="サムネイル">
      <img v-else src="../assets/images/default.png" alt="サムネイル">
      <p class="profile-name">{{ displayName }}</p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  computed: {
    photoURL () {
      if (this.$currentUser) return this.$currentUser.photoURL
    },
    displayName () {
      if (this.$currentUser) return this.$currentUser.displayName
    }
  }
}
</script>
