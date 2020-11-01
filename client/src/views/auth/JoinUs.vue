<template>
     <v-container>
        <v-row justify="center">
            <v-card width="400">
              <v-alert :value="isJoinError" type="error">
                JOIN ERROR   :  {{failedMessage}}
              </v-alert>
                <v-card-title>JOIN US</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-text-field v-model="joinUser.email" label="EMAIL" :rules="rules" type="email"></v-text-field>
                        <v-text-field v-model="joinUser.nick" label="ID" :rules="rules"></v-text-field>
                        <v-text-field v-model="joinUser.password" label="PASSWORD" type="password" @keypress.enter="JOIN(joinUser)" :rules="rules"></v-text-field>
                    </v-form>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-btn text color="primary" @click="JOIN(joinUser)">JOIN</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="goBack">BACK</v-btn>
                    </v-card-actions>
                </v-card-text>
            </v-card>
        </v-row>
    </v-container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
  },
  props: {
    loginDialog: Boolean
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
  computed: {
    ...mapGetters(['joinUser', 'isJoinError', 'failedMessage'])
  },
  methods: {
    ...mapActions(['JOIN']),
    goBack () {
      console.log(this.isJoinError)
      if (this.$route.name !== 'Login') this.$router.push({ name: 'Login' })
    }
  }
}
</script>
<style scoped>
.v-text-field{
    margin: 0 auto;
    margin-bottom: 20px;
    width: 400px;
}
</style>
