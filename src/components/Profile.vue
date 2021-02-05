<template>
  <div class="nav-link profile-container">
    <img v-if="photoURL" v-bind:src="photoURL" alt="サムネイル">
    <img v-else src="../assets/images/default.png" alt="サムネイル" width="100" height="100">
    <p class="profile-name">{{ displayName($currentUser.displayName) }}</p>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  data () {
    return {
      // photoURL: ''
    }
  },
  computed: {
    photoURL () {
      return this.$currentUser.photoURL
    }
  },
  methods: {
    displayName (value) {
      if (value.length > 7) value = value.substr(0, 5) + '...'
      return value
    }
  }
}
</script>

<style>
.profile-container {
  width: 100%;
  padding: 15px;
  text-align: center;
}

.profile-container img {
  border-radius: 50%;
  width: 100px;
  height: 100px;
}

.profile-container .profile-name {
  margin: 0;
  padding-top: 10px;
}

/* .profile-container {
  width: 100%;
  padding: 15px;
  text-align: center;
}

.profile-container img {
  border-radius: 50%;
  width: 100px;
  height: 100px;
}

.profile-container .profile-name {
  margin: 0;
  padding-top: 10px;
} */


</style>
