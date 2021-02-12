<template>
  <div class="nav-link profile-container">
    <router-link class="none-style" :to='"/profile-update"'>
      <img v-if="photoURL" v-bind:src="photoURL" v-bind:alt="$t('utils.thumbnail')">
      <img v-else src="@/assets/images/default.png" v-bind:alt="$t('utils.thumbnail')">
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
