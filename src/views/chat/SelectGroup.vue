<template>
  <div class="group-select-wrapper">
    <span class="group-title">グループ一覧</span>
    <ul v-if="getBelongGroupIds.length > 0">
      <li class="group-list" v-for="gid of getBelongGroupIds" :key="gid.id">
        <div @click="onClickGroup(gid)" class="group-wrapper">
            {{ getGroupInfo(gid).groupName }}
        </div>
      </li>
    </ul>
    <div class="group-title" v-else>所属しているグループはありません</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SelectGroup',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters('groups', [
      'getGroupIds',
      'getGroupInfo'
    ]),
    getBelongGroupIds () {
      return this.getGroupIds.filter(groupId => {
        return Object.keys(this.getGroupInfo(groupId).memberIds).includes(this.$currentUserId)
      })
    }
  },
  methods: {
    onClickGroup (gid) {
      this.$router.push(`groupchat/${gid}`)
    }
  }
}
</script>
