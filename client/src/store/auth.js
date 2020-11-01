import router from '../router/index.js'
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
    joinUser (state) {
      return state.joinUser
    },
    user (state) {
      return state.user
    },
    userInfo (state) {
      return state.userInfo
    },
    isLogin (state) {
      return state.isLogin
    },
    isLoginError (state) {
      return state.isLoginError
    },
    failedMessage (state) {
      return state.failedMessage
    },
    isJoinError (state) {
      return state.isJoinError
    },
    followings (state) {
      return state.followings
    },
    followingsId (state) {
      return state.followingsId
    }
  },
  state: {
    joinUser: {
      email: '',
      nick: '',
      password: ''
    },
    user: {
      email: '',
      password: ''
    },
    userInfo: {
      email: '',
      nick: '',
      id: ''
    },
    followings: [],
    followingsId: [],
    failedMessage: '',
    isLogin: false,
    isLoginError: false,
    isJoinError: false
  },
  mutations: {
    SUCCESSED_LOGIN (state) {
      state.isLogin = true
      state.isLoginError = false
      state.user = { email: '', password: '' }
      console.log(state.isLogin, state.isLoginError)
      // if (route.name !== 'Home') return router.push({ name: 'Home' })
    },
    FAILED_LOGIN_JOIN (state) {
      // 회원가입 필요
      state.isLogin = false
      state.isLoginError = true
      state.failedMessage = 'NEED TO JOIN'
    },
    FAILED_LOGIN_PWD (state) {
      // 패스워드 틀림
      state.isLogin = false
      state.isLoginError = true
      state.failedMessage = 'CHECK PASSWORD'
    },
    SET_ISLOGIN (state) {
      state.isLogin = false
    },
    SET_USER (state, user) {
      state.userInfo = user
    },
    FAILED_JOIN_EXIST (state) {
      state.isJoinError = true
      state.failedMessage = 'EXIST USER'
    },
    SUCCESS_JOIN (state) {
      state.isJoinError = false

      return router.push({ name: 'Home' })
    },
    SET_FOLLOWINGS_LIST (state, fo) {
      state.followingsId = [] // 초기화안해주면 계속 누적된다
      if (fo.length) {
        fo.forEach(f => {
          state.followingsId.push(f.id)
        })
      }
      state.followings = fo
      console.log(state.follwings, state.followingsId)
    }
  },
  actions: {
    JOIN ({ state, commit }, user) {
      // if (user.email.length < 2 || user.password.length < 2) return alert('글자를 좀 더 쓰세요!')
      instance.post('/auth/join', {
        email: user.email,
        password: user.password,
        nick: user.nick
      })
        .then((res) => {
          commit('SUCCESS_JOIN')
          alert(res.data)
        })
        .catch(function (error) {
          console.log(error)
          return commit('FAILED_JOIN_EXIST')
        })
    },
    LOGIN ({ dispatch, commit }, user) {
      // if (user.email.length < 2 || user.password.length < 2) return alert('글자를 좀 더 쓰세요!')
      instance.post('/auth/login', {
        email: user.email,
        password: user.password
      })
        .then((res) => {
          console.log(res.data)
          if (res.data === '회원가입') return commit('FAILED_LOGIN_JOIN')
          if (res.data === '비밀번호') return commit('FAILED_LOGIN_PWD')
          commit('SET_USER', res.data)
          localStorage.setItem('prev_login_user', JSON.stringify(user))
          return commit('SUCCESSED_LOGIN')
        })
        .catch((error) => {
          alert('로그인 에러입니다!')
          console.log(error)
        })
    },
    LOGOUT ({ state, commit }) {
      console.log('in logout')
      instance.get('/auth/logout', { withCredentials: true })
        .then((res) => {
          console.log(res.data)
          if (res.data === 'succeed') {
            localStorage.removeItem('prev_login_user')
            commit('SET_ISLOGIN', false)
          } else console.log('로그아웃 err 발생')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    GET_USER_REFRESH ({ commit, dispatch }) {
      const user = JSON.parse(localStorage.getItem('prev_login_user'))
      if (user) {
        instance.get('/auth/relogin')
          .then((res) => {
            const userInfo = { email: res.data.email, nick: res.data.nick, id: res.data.id }
            commit('SET_USER', res.data)
            commit('SUCCESSED_LOGIN', userInfo)
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    GET_FOLLOWINGS_LIST ({ commit }) {
      instance.get('./user/followings')
        .then(res => {
          console.log(res.data)
          commit('SET_FOLLOWINGS_LIST', res.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
}
