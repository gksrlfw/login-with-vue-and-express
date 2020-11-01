import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/auth/Login.vue'
import JoinUs from '../views/auth/JoinUs.vue'
import UserInfo from '../views/auth/UserInfo.vue'
import PostContent from '../views/post/PostContent.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/auth/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/auth/join',
    name: 'JoinUs',
    component: JoinUs
  },
  {
    path: '/auth/userinfo',
    name: 'UserInfo',
    component: UserInfo
  },
  {
    path: '/post/postcontent',
    name: 'PostContent',
    component: PostContent
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
