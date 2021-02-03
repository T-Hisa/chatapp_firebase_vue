<template>
  <change-profile />
</template>

<script>
import ChangeProfile from '@/components/ChangeProfile'

export default {
  name: 'SetUpProfile',
  components: {
    ChangeProfile
  }
}
</script>

<style>
.file-label {
  display: flex;
  cursor: pointer;
  justify-content: center;
}

.none-display {
  display: none;
}

.profile-register-btn {
  margin: 0 auto 20px auto;
}

.img-wrapper {
  display: flex;
  justify-content: center;
}

.img-wrapper img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.btn-wrapper {
  display: flex;
}

.reset-btn {
  margin: auto 0;
  margin-left: 10px;
}

.reset-btn:hover {
  cursor: pointer;
}

</style>
