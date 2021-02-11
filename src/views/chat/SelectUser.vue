<template>
  <div class="">
    <user-select
      v-bind:type="'DM'"
    />
  </div>
</template>

<script>
import UserSelect from '@/components/UserSelect'

export default {
  name: 'SelectUser',
  components: {
    UserSelect
  }
}
</script>
