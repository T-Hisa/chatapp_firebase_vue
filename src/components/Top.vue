<template>
  <div class='header bg-info'>
    <b-navbar class="custom-nav-bar" toggleable="lg" type="dark" variant="info">
      <span class="title">My Chat</span>
      <div class="menu-container">
        <div class="select-locale-container">
          <b-dropdown
            id="dropdown-1" size="sm" variant="outline-light" v-bind:text="$t('top.select_locale')"
            class="m-md-2 select-locale-wrapper"
          >
            <b-dropdown-item @click="onClickSelectLocale('en')">{{$t('top.english')}}</b-dropdown-item>
            <b-dropdown-item @click="onClickSelectLocale('ja')">{{$t('top.japanese')}}</b-dropdown-item>
          </b-dropdown>
        </div>
        <div v-if="$currentUser && $currentUser.displayName" class='flex-display'>
          <div v-if="$currentUser && $currentUser.displayName" @click="onClickDropdown" class="notify-display-wrapper">
            <i class="fas fa-bell custom-font"></i>
            <span class="notify-number">{{notificationCount}}
              <i class="fas fa-angle-down"></i>
            </span>
            <div class="notify-detail-wrapper bg-info" v-bind:class="{ active: dropdownFlag }" >
              <div v-for="nid in displayNotificationIds" :key="nid.id">
                <notification-card
                  v-bind:nid="nid"
                  v-bind:fromId="getFromId(nid)"
                  v-bind:type="getType(nid)"
                />
              </div>
            </div>
          </div>
          <ul v-if="isUserPropsSet" class="top-btn-wrapper navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="#" @click="onClickSignOutBtn">{{$t('top.sign_out')}}</a>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/profile-update">{{$t('top.edit_profile')}}</router-link>
            </li>
          </ul>
        </div>
        <div v-else-if="$currentUser">
          <a @click="onClickSignOutBtn">{{$t('top.sign_out')}}</a>
        </div>
        <div class="sign-wrapper" v-else>
          <router-link v-if="isPathSignin" to="/signup">{{$t('top.sign_up')}}</router-link>
          <router-link v-else to="/signin">{{$t('top.sign_in')}}</router-link>
        </div>
      </div>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import NotificationCard from '@/components/NotificationCard'

export default {
  name: 'TopView',
  data () {
    return {
      dropdownFlag: false,
      handleClick: 0
    }
  },
  props: {
    isPathSignin: {
      type: Boolean,
      default: false
    }
  },
  components: {
    NotificationCard
  },
  computed: {
    ...mapGetters('users', [
      'getUserInfo'
    ]),
    ...mapGetters('notifications', [
      'getUserNotification',
      'getNotificationDetail'
    ]),
    isUserPropsSet () {
      return !!(this.$currentUser && this.$currentUser.displayName)
    },
    notificationCount () {
      const length = this.notificationIds.length
      if (this.notificationIds.length > 10) {
        return '10＋'
      }
      return length
    },
    notificationIds () {
      return Object.keys((this.getUserNotification) || {})
    },
    displayNotificationIds () {
      return this.notificationIds.slice(0, 10)
    }
  },
  methods: {
    ...mapActions('notifications', [
      'removeNotifications'
    ]),
    ...mapActions('users', [
      'setLocale'
    ]),
    async onClickSignOutBtn () {
      await this.$firebase.auth().signOut()
    },
    getFromId (nid) {
      return this.getUserNotification[nid].fromId
    },
    getType (nid) {
      return this.getUserNotification[nid].type
    },
    onClickDropdown () {
      if (this.dropdownFlag) {
        if (this.notificationIds) {
          const removeVal = {
            currentUid: this.$currentUserId,
            notificationIds: this.notificationIds
          }
          this.removeNotifications(removeVal)
        }
      }
      this.dropdownFlag = !this.dropdownFlag
    },
    onClickSelectLocale (lang) {
      this.$changeLocale(lang)
    }
  }
}
</script>
