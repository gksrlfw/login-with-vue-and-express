<template>
  <div v-if="isLogin">
    <content-list :postList="postList" @changePostList="changePostList"></content-list>
  </div>
  <div v-else>Hello!!</div>
</template>

<script>
// home에 오면 항상 게시글들을 보여준다
import ContentList from './post/ContentList.vue'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      postList: []
    }
  },
  watch: {
    isLogin (o, n) {
      if (o !== n) this.getFollowingsList()
    }
  },
  computed: {
    ...mapGetters(['isLogin'])

  },
  components: {
    ContentList
  },
  created () {
    this.getPostList()
  },
  methods: {
    changePostList (postLi) {
      postLi.reverse()
      this.postList = postLi
    },
    getPostList () {
      this.$http.get('/post/list')
        .then(res => {
          console.log(res.data)
          this.postList = res.data
          this.postList.reverse()
        })
        .catch(err => {
          console.log(err)
          alert('포스트를 부르는데 실패했습니다!')
        })
    },
    getFollowingsList () {
      if (this.isLogin) {
        this.$store.dispatch('GET_FOLLOWINGS_LIST')
      }
    }
  }
}
</script>

<style>

</style>
