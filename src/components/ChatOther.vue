<template>
  <div class="chat-container">
    <div class="img-other">
      <img v-if="photoURL" v-bind:src="photoURL" v-bind:alt="$t('utils.thumbnail')">
      <img v-else src="@/assets/images/default.png" v-bind:alt="$t('utils.thumbnail')">
    </div>
    <div class="chat-other chat-common">
      <p class="chat-wrapper">{{body}}<span class="triangle"/></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatSelf',
  props: {
    photoURL: String,
    uid: String,
    body: String
  }
}
</script>
