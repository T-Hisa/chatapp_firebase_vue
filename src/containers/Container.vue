<template>
  <div class="flex-display" style="border-top: 2px solid darkslateblue;" >
    <sidebar
      :key="redrawFlag"
    />
    <div class="container">
      <div class="wrapper">
        <router-view/>
      </div>
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
      console.log('catch redrawFlag in Container')
      this.redrawFlag++
    })
  }
}
</script>
