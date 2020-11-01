
<template>
    <div>
      <v-card max-width="600" class="mx-auto">
        <v-card-title>PROFILE</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <!-- userid를 받아오려면 서버에서 받아야한다... 서버에서 유저와 관련된 모든 데이터를 받아와야되네.. -->
          <div>user email : {{userInfo.email}}</div>
          <div>user id : {{userInfo.nick}}</div>

        </v-card-text>
      </v-card>
      <div></div>
      <v-card max-width="600" class="mx-auto">
        <v-card-title>팔로잉 목록</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <div v-for="f in followings" :key="f">{{ f.nick }}</div>
        </v-card-text>
      </v-card>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  created () {
    console.log(this.userInfo, this.followings)
    // this.$http.get('./user/followings')
    //   .then(res => {
    //     console.log(res.data)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
  },
  computed: {
    ...mapGetters(['userInfo', 'followings'])
  }
}
</script>

<style>

</style>
