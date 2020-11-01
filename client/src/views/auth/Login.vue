<template>
     <v-container>
        <v-row justify="center">
            <v-card width="400">
              <v-alert :value="isLoginError" type="error">
                LOGIN ERROR   :  {{failedMessage}}
              </v-alert>
                <v-card-title>SIGN IN</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-text-field v-model="user.email" label="user id" :rules="rules"></v-text-field>
                        <v-text-field v-model="user.password" label="password" type="password" @keypress.enter="login(user)" :rules="rules"></v-text-field>
                    </v-form>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-btn text color="primary" @click="login(user)">SIGN IN</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="joinUs">JOIN US</v-btn>
                    </v-card-actions>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <!-- <v-btn color="yellow" width="100%" @click="KAKAO_LOGIN">KAKAO LOGIN</v-btn> -->
                      <!-- <v-btn color="yellow" width="100%"><a href="http://localhost:8001/auth/kakao">카카오</a></v-btn> -->
                    </v-card-actions>
                </v-card-text>
            </v-card>
        </v-row>
    </v-container>
</template>
<script>
/* eslint-disable */
import { mapActions, mapGetters } from 'vuex'
export default {
  created () {
    console.log(this.isLogin, this.isLoginError)
  },
  components: {
  },
  props: {
    loginDialog: Boolean
  },
  computed: {
    ...mapGetters(['isLogin', 'isLoginError', 'user', 'failedMessage'])
  },
  data () {
    return {
      valid: false,
      rules: [
        v => !!v || 'text is required',
        v => (v && v.length <= 10) || 'text must be less than 10 characters',
        v => (v && v.length >= 2) || 'text must be less than 2 characters'
      ]
    }
  },
  watch: {
    isLogin (n, o) {
      if(n !== o) {
        if (this.$route.name !== 'Home') this.$router.push({ name: 'Home' })
      }
    }
  },
  methods: {
    ...mapActions(['LOGIN', 'KAKAO_LOGIN']),
    joinUs () {
      console.log('join')
      if (this.$route.name !== 'JoinUs') this.$router.push({ name: 'JoinUs' })
    },
    async login (user) {
      this.$store.dispatch('LOGIN', user)
      console.log(this.isLogin)      
    }
  }
}
/* eslint-disable */
</script>
<style scoped>
.v-text-field{
    margin: 0 auto;
    margin-bottom: 20px;
    width: 400px;
}
</style>
