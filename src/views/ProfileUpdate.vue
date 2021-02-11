<template>
  <change-profile
    v-bind:isUpdate="true"
   />
</template>

<script>
import ChangeProfile from '@/components/ChangeProfile'

export default {
  name: 'ProfileUpdate',
  components: {
    ChangeProfile
  }
}
</script>
