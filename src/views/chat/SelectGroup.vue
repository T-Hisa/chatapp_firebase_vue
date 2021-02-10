<template>
  <div class="group-select-wrapper">
    <span class="group-title">グループ一覧</span>
    <ul v-if="getBelongGroupIds.length > 0">
      <li class="group-list" v-for="gid of getBelongGroupIds" :key="gid.id">
        <div class="group-wrapper">
          <div @click="onClickGroup(gid)" class="group-name-wrapper">
            {{ getGroupInfo(gid).groupName }}
          </div>
          <button @click="onClickEditBtn(gid)" class="group-edit-btn btn btn-outline-dark">編集</button>
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
    },
    onClickEditBtn (gid) {
      console.log('clicked!!')
      this.$router.push({ name: `CreateGroup`, params: { gid: gid } })
    }
  }
}
</script>
