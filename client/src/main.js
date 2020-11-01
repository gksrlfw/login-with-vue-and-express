import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$http = axios.create({
  // baseURL: 'http://localhost:8001/'
  baseURL: '/'

})

new Vue({
  router,
  store,
  beforeCreate () {
    this.$store.dispatch('GET_USER_REFRESH')
  },
  vuetify,
  render: h => h(App)
}).$mount('#app')
