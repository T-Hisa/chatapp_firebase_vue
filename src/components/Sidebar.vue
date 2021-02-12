<template>
  <div class="bg-info sidebar">
    <ul class="sidebar-ul">
      <profile
      />
      <router-link class="sidebar-anchor" :to ="'/direct'">
        <li class="menu-list">
          <span class="menu">{{$t('sidebar.direct')}}</span><span class="arrow"/>
        </li>
      </router-link>
      <router-link class="sidebar-anchor" :to ="'/groupchat'">
        <li class="menu-list">
          <span class="menu">{{$t('sidebar.group')}}</span><span class="arrow"/>
        </li>
      </router-link>
      <router-link class="sidebar-anchor" :to ="'/notification'">
        <li class="menu-list">
          <span class="menu">{{$t('sidebar.notify')}}</span>
          <span v-if="getUserNotification" class="badge bg-danger badge-custom">{{notificationCount}}</span>
          <span class="arrow"/>
        </li>
      </router-link>
      <router-link class="sidebar-anchor" :to ="'/creategroup'">
        <li class="menu-list">
          <span class="menu">{{$t('sidebar.create_group')}}</span><span class="arrow"/>
        </li>
      </router-link>
    </ul>
  </div>
</template>

<script>
import Profile from './Profile'
import { mapGetters } from 'vuex'

export default {
  name: 'Sidebar',
  data () {
    return {
    }
  },
  components: {
    Profile
  },
  computed: {
    ...mapGetters('notifications', [
      'getUserNotification'
    ]),
    notificationCount () {
      return (Object.keys((this.getUserNotification) || {}).slice(0, 10)).length
    }
  }
}
</script>
