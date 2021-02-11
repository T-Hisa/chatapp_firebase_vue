<template>
  <div class="chat-container">
    <div class="chat-me chat-common">
      <p class="chat-wrapper"><span class="triangle"/>{{ body }}</p>
    </div>
    <div class="img-me">
      <img v-if="photoURL" v-bind:src="photoURL" v-bind:alt="$t('utils.thumbnail')">
      <img v-else src="../assets/images/default.png" v-bind:alt="$t('utils.thumbnail')">
    </div>
  </div>
</template>

<script>

export default {
  name: 'ChatSelf',
  props: {
    photoURL: String,
    uid: String,
    body: String,
    chatId: String
  }
}
</script>
