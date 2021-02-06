<template>
  <div class="sidebar">
    <div class="nav-bar">
      <ul class="sidebar-list">
        <profile
        />
        <router-link class="sidebar-anchor" :to ="'/home'">
          <li>
            <span class="menu">Chat</span>
          </li>
        </router-link>
        <router-link class="sidebar-anchor" :to ="'/home'">
          <li>
            <span class="menu">Chat</span>
          </li>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import Profile from './Profile'

export default {
  name: 'Sidebar',
  data () {
    return {
    }
  },
  components: {
    Profile
  }
}
</script>
