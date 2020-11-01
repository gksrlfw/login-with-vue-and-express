
// 굳이 이렇게 따로 안빼도 될듯 ㅇㅇ..

// import router from '../router/index.js'
import axios from 'axios'

// 결국 서버의 session 저장문제 때문에 프록시를 사용해야 한다..
const instance = axios.create({
  // baseURL: 'http://localhost:8001/'
  baseURL: '/'
  // headers: {
  //   Accept: 'application/json',
  //   'Content-Type': 'application/json'
  // }
})

export default {
  getters: {
    postList (state) {
      return state.postList
    },
    image (state) {
      return state.image
    },
    content (state) {
      return state.content
    },
    prevImage (state) {
      return state.prevImage
    }
  },
  state: {
    postList: [],
    image: [],
    content: '',
    prevImage: ''
  },
  mutations: {

  },
  actions: {
    getPostList () {
      instance.get('/')
    },
    POST_IMAGE ({ commit }, form) {
      instance.post('/post/img', form)
        .then((res) => {
          console.log(res.data)
          this.prevImage = res.data.url
          console.log(this.prevImage)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
}
