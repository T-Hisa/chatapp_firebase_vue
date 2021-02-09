<template>
  <div class="chat-container">
    <div class="chat-other chat-common">
      <p class="chat-wrapper">{{body}}<span class="triangle"/></p>
    </div>
    <div class="img-other">
      <img v-if="photoURL" v-bind:src="photoURL" alt="サムネイル">
      <img v-else src="../assets/images/default.png" alt="サムネイル">
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatSelf',
  data () {
    return {
      // otherUserPhotoURL: '',
      // otherUserName: '',
      // otherUserId: '',
      // comment: ''
    }
  },
  props: {
    photoURL: String,
    uid: String,
    body: String
  },
  created () {
  },
  mounted () {
  },
  updated () {
  },
  computed: {
  },
  methods: {
  }
}
</script>
