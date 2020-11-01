<template>
  <v-app id="App">
    <app-header></app-header>
    <v-content>
      <router-view></router-view>
    </v-content>
    <app-footer></app-footer>
  </v-app>
</template>

<script>
// https://github.com/fkkmemi/ve

import AppHeader from './components/AppHeader'
import AppFooter from './components/AppFooter'

export default {
  name: 'App',

  components: {
    AppHeader, AppFooter
  },

  data: () => ({
    //
  })
}
</script>
