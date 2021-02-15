<template>
  <div class="group-select-wrapper">
    <span class="group-title">{{$t('groups.select_group')}}</span>
    <input type="text" class="group-search-field" v-model="searchParams" v-bind:placeholder="$t('groups.search_group')">
    <div class="no-group" v-if="getBelongGroupIds.length === 0">{{$t('groups.no_belonging_group')}}</div>
    <ul class="group-list-wrapper" v-else-if="getGroupIdsFlexiblly().length > 0">
      <li class="group-list" v-for="gid of getGroupIdsFlexiblly()" :key="gid.id">
        <group
          v-bind:gid="gid"
        />
      </li>
    </ul>
    <div class="no-group" v-else>{{$t('groups.no_search_hit_group')}}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Group from '@/components/Group'

export default {
  name: 'SelectGroup',
  data () {
    return {
      searchParams: ''
    }
  },
  components: {
    Group
  },
  mounted () {
    if (this.$route.params.groupName) {
      const groupName = this.$route.params.groupName
      alert(this.$t('groups.already_group_deleted', { groupName }))
    }
  },
  computed: {
    ...mapGetters('groups', [
      'getGroupIds',
      'getGroupInfo',
      'searchGroupIdsByName'
    ]),
    getBelongGroupIds () {
      return this.getGroupIds.filter(groupId => {
        return Object.keys(this.getGroupInfo(groupId).memberIds).includes(this.$currentUserId)
      })
    }
  },
  methods: {
    getBelongAndSearchByName (searchParams) {
      const searchIds = this.searchGroupIdsByName(searchParams)
      return searchIds.filter(gid => {
        const groupMembers = this.getGroupInfo(gid).memberIds || {}
        return Object.keys(groupMembers).includes(this.$currentUserId)
      })
    },
    getGroupIdsFlexiblly () {
      const searchParams = this.searchParams
      if (searchParams) {
        return this.getBelongAndSearchByName(searchParams)
      } else {
        return this.getBelongGroupIds
      }
    }
  }
}
</script>
