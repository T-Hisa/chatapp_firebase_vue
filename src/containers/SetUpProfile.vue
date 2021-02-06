<template>
  <change-profile
    @redraw-flag="emitRedrawFlag"
  />
</template>

<script>
import ChangeProfile from '@/components/ChangeProfile'

export default {
  name: 'SetUpProfile',
  components: {
    ChangeProfile
  },
  methods: {
    emitRedrawFlag () {
      this.$emit('redraw-flag')
    }
  }
}
</script>
