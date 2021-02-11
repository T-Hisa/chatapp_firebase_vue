<template>
  <div class="">
    <user-select
      v-bind:type="'info'"
    />
  </div>
</template>

<script>
import UserSelect from '@/components/UserSelect'

export default {
  name: 'UserInfo',
  components: {
    UserSelect
  }
}
</script>
