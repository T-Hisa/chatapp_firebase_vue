<template>
  <div class="bg-info sidebar">
    <ul class="sidebar-ul">
      <profile
      />
      <router-link class="sidebar-anchor" :to ="'/direct'">
        <li class="">
          <span class="menu">Direct<span class="arrow"/></span>
        </li>
      </router-link>
      <router-link class="sidebar-anchor" :to ="'/group'">
        <li>
          <span class="menu">Group<span class="arrow"/></span>
        </li>
      </router-link>
      <router-link class="sidebar-anchor" :to ="'/notification'">
        <li>
          <span class="menu">Notify<span class="arrow"/></span>
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
