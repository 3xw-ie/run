<template>
  <div id="auth0-lock"/>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  middleware: ['anonymous'],
  layout: 'empty',
  computed: mapGetters(['account', 'dashboard']),
  mounted() {
    console.log(this.account)
    const showLogin = require('~/utils/lock').showLogin
    showLogin({
      container: 'auth0-lock',
      languageDictionary: {
        title: this.account.name ? 'Run | ' + this.account.name : 'Run | by 3xW'
      },
      theme: {
        logo: this.account.logo,
        primaryColor: this.dashboard.primaryColor
      }
    })
  }
}
</script>
