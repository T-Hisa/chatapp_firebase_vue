<template>
  <div class='header bg-info'>
    <b-navbar class="custom-nav-bar" toggleable="lg" type="dark" variant="info">
      <span class="title">ChatApp</span>
      <div v-if="$currentUser && $currentUser.displayName" class='flex-display'>
        <div v-if="$currentUser && $currentUser.displayName" class="notify-wrapper">
          <i class="fas fa-bell custom-font"></i>
          <span>0
            <i class="fas fa-angle-down"></i>
          </span>
        </div>
        <div v-if="$currentUser && $currentUser.displayName" class="top-btn-wrapper">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="#" @click="onClickSignOutBtn">Sign Out</a>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/profile-update">プロフィール変更</router-link>
            </li>
          </ul>
        </div>
      </div>
      <div v-else-if="$currentUser">
        <a @click="onClickSignOutBtn">Sign Out</a>
      </div>
      <div v-else>
        <router-link v-if="isPathSignin" class="f-black" to="/signup">Sign Up</router-link>
        <router-link v-else class="f-black" to="/signin">Sign In</router-link>
      </div>
      <!-- <div v-if="$currentUser" class="" >
      </div>
      <div v-else>
        <router-link v-if="isPathSignin" class="f-black" to="/signup">Sign Up</router-link>
        <router-link v-else class="f-black" to="/signin">Sign In</router-link>
      </div> -->
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'TopView',
  data () {
    return {
      popUpMessage: '管理者の操作を待つまで、同じメールアドレスでは登録できません。よろしいですか？'
    }
  },
  props: {
    isUserSignin: {
      type: Boolean,
      default: false
    },
    isPathSignin: {
      type: Boolean,
      default: false
    }
  },
  created () {
  },
  mounted () {
  },
  updated () {
  },
  computed: {
    isPathConfirm () {
      const flag = this.$route.path.includes('confirm')
      return flag
    }
  },
  methods: {
    async onClickSignOutBtn () {
      await this.$firebase.auth().signOut()
      this.$router.go(-1) || this.$router.push('/signin')
    }
  }
}
</script>

<style>
a:hover {
  cursor: pointer;
}

.header {
  color: white;
  text-align: right;
}

.custom-nav-bar {
  justify-content: space-between;
}

.flex-display {
  display: flex;
}

.notify-wrapper {
  margin-right: 10px;
}

.flex-display span {
  font-size: 15px;
  font-weight: bold;
  margin: auto 0;
}

.header .custom-font {
  line-height: 40px;
  font-size: 20px;
}

.title {
  color: white;
  font-weight: bold;
  font-size: 30px;
  margin-left: 30px;
}

.top-btn-wrapper {
  display: flex;
  align-items: center;
}
</style>
