<template>
  <div>
    <v-card v-for="(post, i) in postList" :key="i" max-width="600" class="mx-auto">
      <v-card-title>내용: {{ post.content }}</v-card-title>
      <v-card-text >
          <small>게시글 번호: {{ post.id }}</small>
          <v-img  max-width="500" max-height="300" :src="post.img"></v-img>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="deep-purple accent-4" @click="followUser(post)" v-if="post.UserId !== userInfo.id && !followingsId.includes(post.UserId)">팔로잉 추가</v-btn>
        <v-btn text color="deep-purple accent-4" @click="unFollowUser(post)" v-if="post.UserId !== userInfo.id && followingsId.includes(post.UserId)">팔로잉 취소</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="deletePost(post)" text color="deep-purple accent-4" v-if="post.UserId === userInfo.id">게시글 삭제</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  created () {

  },
  data: function () {
    return {
      return: {
        followingsId: []
      }
    }
  },
  props: {
    postList: Array
  },
  computed: {
    ...mapGetters(['userInfo', 'followings', 'followingsId'])
  },
  methods: {
    getPostList () {
      console.log('???')
      this.$http.get('./post/list')
        .then(res => {
          console.log(res.data)
          this.$emit('changePostList', res.data)
        })
        .catch(err => {
          console.log(err)
          alert('포스트를 부르는데 실패했습니다!')
        })
    },
    deletePost (post) {
      if (!confirm('정말 삭제할래요?')) return
      this.$http.delete(`./post/${post.id}/delete`)
        .then(res => {
          console.log(res.data)
          this.getPostList()
        })
        .catch(err => {
          console.log(err)
          alert('게시물 삭제에 실패했습니다!')
        })
    },
    followUser (post) {
      console.log('aa')
      this.$http.post(`./user/${post.UserId}/follow`)
        .then(res => {
          console.log(res.data)
          this.$store.dispatch('GET_FOLLOWINGS_LIST')
        })
        .catch(err => {
          console.log(err)
        })
    },
    unFollowUser (post) {
      this.$http.post(`./user/${post.UserId}/unfollow`)
        .then(res => {
          console.log(res.data)
          this.$store.dispatch('GET_FOLLOWINGS_LIST')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>
