<template>
  <v-dialog
      v-model="loginDialog"
      max-width="600"
    >
      <v-card>
        <v-card-title class="headline">
          Login
            <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="closeDialog"
          >
                 X
          </v-btn>
        </v-card-title>
        <v-text-field
        v-model="userID"
            label="ID"
            hide-details="auto"
            ></v-text-field>
        <v-text-field v-model="userPW" label="PASSWORD"></v-text-field>
        <v-card-text>

        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

        <v-btn

            color="green darken-1"
            text
            @click="joinUsDialog = !joinUsDialog"
          >
            JOIN US
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="postLogin"
          >
            LOGIN
          </v-btn>
        </v-card-actions>
      </v-card>
      <join-us-dialog v-if="joinUsDialog" :joinUsDialog="joinUsDialog" @closeDialog="closeJoinDialog"></join-us-dialog>
    </v-dialog>
</template>
<script>
import JoinUsDialog from './JoinUsDialog'
export default {
  components: {
    JoinUsDialog
  },
  props: {
    loginDialog: Boolean
  },
  data () {
    return {
      Dialog: false,
      joinUsDialog: false,
      userID: '',
      userPW: ''
    }
  },
  methods: {
    closeJoinDialog (check) {
      this.joinUsDialog = check
    },
    closeDialog () {
      this.dialog = false
      this.$emit('closeDialog', this.dialog)
    },
    postLogin () {
      console.log(this.userID, this.userPW)
      // axios 요청으로 서버에 인증을 요구한다 -> 서버에서 인증되면 redirec로 홈페이지를 보여준다. 안되면 그대로~
      this.closeDialog()
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
