<template>
  <div class="flex-display" style="border-top: 2px solid darkslateblue;" >
    <sidebar
      :key="redrawFlag"
    />
    <div class="relative-container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'
import EventBus from '@/event'

export default {
  name: 'Container',
  data () {
    return {
      redrawFlag: 0
    }
  },
  components: {
    Sidebar
  },
  created () {
  },
  mounted () {
    EventBus.$on('redraw-flag', () => {
      this.redrawFlag++
    })
  }
}
</script>
