<template>
    <v-card>
        <v-card-title>게시글 업로드</v-card-title>
        <v-card-text>
          <v-textarea
            solo
            name="input-7-4"
            label="Solo textarea" v-model="content"
          ></v-textarea>
        </v-card-text>
        <v-card-actions>
            <v-file-input id="img" v-model="image" accept="image/*" label="img">업로드</v-file-input>
            <v-img  max-width="500" max-height="300" :src="prevImage"></v-img>
            <v-spacer></v-spacer>
            <v-btn @click="postContent">등록</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
/* eslint-disable */
export default {
  computed: {
  },
  data () {
    return {
      image: [],
      content: '',
      prevImage: ''
    }
  },
  watch: {
    image (o, n) {
      if (o !== n) {
        this.postImage()
      }
    }
  },
  methods: {
    postImage () {
      console.log('post!', this.image)
      const form = new FormData()
      form.append('image', this.image)
      this.$http.post('/post/img', form)
        .then((res) => {
          console.log(res.data)
          this.prevImage = res.data.url
          console.log(this.prevImage)
        })
        .catch(err => {
          console.log(err)
        })
    },
    postContent () {
      this.$http.post('/post', { content: this.content, url: this.prevImage })
        .then((res) => {
            console.log('post!!', res.status)
            this.$router.push({ name: 'Home' })
        })
        .catch(err => {
          console.log(err)
          alert('포스팅에 실패했습니다!')
        })
    }
  }
}
/* eslint-disable */
</script>

<style>

</style>
