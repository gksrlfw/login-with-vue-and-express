<template>
  <div>
      <v-navigation-drawer
        v-model="drawer"
        app
        clipped
      >
        <v-list dense>
          <v-list-item link v-for="list in lists" :key="list.name" :to="list.to">
            <v-list-item-action>
              <v-icon>mdi-pencil</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                  {{list.name}}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar
        app
        clipped-left>
      <!-- color="deep-purple accent-4"> -->
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title @click="goHome">Application</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn @click="clickLogin" v-if="!isLogin"><v-icon>mdi-login</v-icon></v-btn>
        <div v-else>환영합니다!
          <v-btn @click="clickUserInfo" ><v-icon>mdi-account</v-icon></v-btn>
          <v-btn @click="LOGOUT" >로그아웃</v-btn>
        </div>
      </v-app-bar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  created () {
  },
  components: {
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  data () {
    return {
      drawer: false,
      lists: [
        {
          name: 'post',
          to: '/post/postcontent'
        },
        {
          name: 'File2DB',
          to: '/File2DB'
        }
      ],
      loginDialog: false
    }
  },
  methods: {
    ...mapActions(['LOGOUT']),
    goHome () {
      if (this.$route.name !== 'Home') this.$router.push({ name: 'Home' })
    },
    clickLogin () {
      if (this.$route.name !== 'Login') this.$router.push({ name: 'Login' })
    },
    clickLogout () {
      this.$store.commit('SET_ISLOGIN', false)
    },
    clickUserInfo () {
      if (this.$route.name !== 'UserInfo') this.$router.push({ name: 'UserInfo' })
    }
  }

}
</script>
