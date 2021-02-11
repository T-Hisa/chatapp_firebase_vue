<template>
  <div class="">
    <div class="user-select-wrapper bg-lightskyblue">
      <div class="user-select-title-wrapper">
        <span class="user-title">{{displayTitle}}</span>
        <span class="user-select-title">{{$t('select_user.select_user')}}</span>
        <span class="user-search-field-wrapper">
          <input class="user-search-field" type="text" v-bind:placeholder="$t('select_user.search_user')" v-model="searchParams">
        </span>
      </div>
      <div class="no-user" v-if="!getOtherUserIds">{{$t('select_user.no_user')}}</div>
      <div class="no-user" v-else-if="getOtherUserIdsFlexiblly(searchParams).length === 0">{{$t('select_user.no_search_hit_user')}}</div>
      <ul v-else class="user-select-list">
        <li v-for="uid of getOtherUserIdsFlexiblly(searchParams)" :key="uid.id" class="user-info-wrapper">
          <user
            v-bind:uid="uid"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import User from '@/components/User'
import { mapGetters } from 'vuex'

export default {
  name: 'UserSelect',
  data () {
    return {
      searchParams: ''
    }
  },
  components: {
    User
  },
  computed: {
    ...mapGetters('users', [
      'getUsers',
      'getUserInfo',
      'getOtherUserIds',
      'searchOtherUserIds'
    ]),
    userIds () {
      return Object.keys(this.getUsers)
    },
    displayTitle () {
      return this.$t('select_user.direct_message')
      // return this.type === 'DM' ? this.$t('select_user.direct_message') : this.$t('select_user.user_info')
    }
  },
  methods: {
    onClickUser (uid) {
      if (this.type === 'DM') {
        this.$router.push(`direct/${uid}`)
      } else {
        this.$router.push(`user-detail/${uid}`)
      }
    },
    getOtherUserIdsFlexiblly () {
      const params = this.searchParams
      if (params) {
        return this.searchOtherUserIds(params)
      } else {
        return this.getOtherUserIds
      }
    }
  }
}
</script>
