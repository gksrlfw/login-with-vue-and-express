<template>
  <v-dialog
      v-model="joinUsDialog"
      max-width="600"
    >
      <v-card>
        <v-card-title class="headline">
          JOIN US
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
        v-model="userEMAIL"
            label="EMAIL"
            hide-details="auto"
        ></v-text-field>
        <v-text-field  v-model="userID" label="ID"></v-text-field>
        <v-text-field v-model="userPW" label="PASSWORD"></v-text-field>
        <v-card-text>

        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="postJoin"
          >
            JOIN
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script>
export default {
  props: {
    joinUsDialog: Boolean
  },
  data () {
    return {
      dialog: false,
      userEMAIL: '',
      userID: '',
      userPW: ''
    }
  },
  methods: {
    closeDialog () {
      this.dialog = false
      this.$emit('closeDialog', this.dialog)
    },
    postJoin () {
      console.log(this.userEMAIL, this.userID, this.userPW)
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
