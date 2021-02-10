<template>
    <div class="create-group-container bg-skyblue">
      <form class="form-container group-form-container">
        <div class="form-group form-wrapper">
          <label class="group-label" for="group-name">グループ名
            <span v-if="!$v.groupName.required" class="text-danger font-weight-bold">※グループ名を入力してください</span>
          </label>
          <input type="text" class="form-control" v-model="groupName">
        </div>
      </form>
      <div class="whole-member-list">
        <p class="member-title">グループメンバーリスト</p>
        <ul class="member-list-container">
          <li v-for="uid of selectedUserIds" :key="uid.id" class="member-list-wrapper">
            <div>
              <div class="member-wrapper">
                <img v-if="getUserInfo(uid).photoURL" v-bind:src="getUserInfo(uid).photoURL" alt="サムネイル">
                <img v-else src="../../assets/images/default.png" alt="サムネイル">
                <div class="member-info">
                  {{ getUserInfo(uid).username }}
                </div>
                <i @click="onClickDeleteBtn" class="fas fa-2x fa-times cross-icon"></i>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="whole-member-list">
        <p class="member-title">メンバー選択</p>
        <ul class="member-list-container">
          <li v-for="uid of getOtherUserIds" :key="uid.id" class="member-list-wrapper">
            <div @click="onClicKUser(uid)">
              <div class="member-wrapper">
                <img v-if="getUserInfo(uid).photoURL" v-bind:src="getUserInfo(uid).photoURL" alt="サムネイル">
                <img v-else src="../../assets/images/default.png" alt="サムネイル">
                <div class="member-info">
                  {{ getUserInfo(uid).username }}
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="group-create-btn-wrapper">
        <button @click="onClickCreateGroupBtn" class="btn btn-dark">
          <span v-if="gid">グループ更新</span>
          <span v-else>グループ作成</span>
        </button>
      </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'CreateGroup',
  data () {
    return {
      groupName: '',
      selectedUserIds: [],
      gid: ''
    }
  },
  validations: {
    groupName: {
      required
    }
  },
  components: {
  },
  created () {
  },
  mounted () {
    if (this.$route.params.gid) {
      this.gid = this.$route.params.gid
      const groupInfo = this.getGroupInfo(this.gid)
      console.log('groupInfo', groupInfo)
      this.groupName = groupInfo.groupName
      this.selectedUserIds = Object.keys(groupInfo.memberIds).filter(uid => uid !== this.$currentUserId)
    }
  },
  updated () {
  },
  computed: {
    ...mapGetters('users', [
      'getUsers',
      'getUserInfo'
    ]),
    ...mapGetters('groups', [
      'getGroupInfo'
    ]),
    getOtherUserIds () {
      let otherUserIds = Object.keys(this.getUsers).filter(uid => {
        return uid !== this.$currentUserId && this.getUserInfo(uid).emailVerified && !this.selectedUserIds.includes(uid)
      })
      return otherUserIds
    }
  },
  methods: {
    ...mapActions('groups/', [
      'createGroup',
      'updateGroup'
    ]),
    onClicKUser (uid) {
      this.selectedUserIds.push(uid)
    },
    onClickDeleteBtn (uid) {
      let index = this.selectedUserIds.indexOf(uid)
      this.selectedUserIds.splice(index, 1)
    },
    onClickCreateGroupBtn () {
      if (this.$v.groupName.required) {
        let value = {
          groupName: this.groupName,
          memberIds: {}
        }
        for (let memberId of this.selectedUserIds) {
          value['memberIds'][memberId] = 0
        }
        value['memberIds'][this.$currentUserId] = 0
        if (this.gid) {
          const sendValue = {
            gid: this.gid,
            value: value
          }
          this.updateGroup(sendValue)
        } else {
          this.createGroup(value)
        }
        this.$router.push('/groups')
      } else {
        alert('グループ名を入力してください')
      }
    }
  }
}
</script>
