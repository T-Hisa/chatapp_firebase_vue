<template>
  <div class="chat-container">
    <div class="img-me">
      <img v-if="photoURL" v-bind:src="photoURL" alt="サムネイル">
      <img v-else src="../assets/images/default.png" alt="サムネイル">
    </div>
    <div class="chat-me chat-common">
      <p class="chat-wrapper"><span class="triangle"/>{{body}}</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ChatSelf',
  data () {
    return {
    }
  },
  props: {
    photoURL: String,
    uid: String,
    body: String
  }
}
</script>
