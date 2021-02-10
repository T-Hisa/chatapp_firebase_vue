<template>
  <div class="bg-info sidebar">
    <ul class="sidebar-ul">
      <profile
      />
      <router-link class="sidebar-anchor" :to ="'/direct'">
        <li class="menu-list">
          <span class="menu">Direct</span><span class="arrow"/>
        </li>
      </router-link>
      <router-link class="sidebar-anchor" :to ="'/groups'">
        <li class="menu-list">
          <span class="menu">Group</span><span class="arrow"/>
        </li>
      </router-link>
      <router-link class="sidebar-anchor" :to ="'/notification'">
        <li class="menu-list">
          <span class="menu">Notify</span><span class="arrow"/>
        </li>
      </router-link>
      <router-link class="sidebar-anchor" :to ="'/notification'">
        <li class="menu-list">
          <span class="menu">User Info</span><span class="arrow"/>
        </li>
      </router-link>
      <router-link class="sidebar-anchor" :to ="'/creategroup'">
        <li class="menu-list">
          <span class="menu absolute-menu">Create Group</span><span class="arrow absolute-arrow"/>
        </li>
      </router-link>
    </ul>
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
