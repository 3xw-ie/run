<template>
  <div id="auth0-lock"/>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  middleware: ['anonymous'],
  layout: 'empty',
  computed: mapGetters(['account', 'pageTitle', 'dashboard']),
  beforeMount() {
    const showLogin = require('~/utils/lock').showLogin
    showLogin({
      container: 'auth0-lock',
      languageDictionary: {
        title: this.pageTitle
      },
      theme: {
        logo: this.account.logo,
        primaryColor: this.dashboard.primaryColor
      }
    })
  }
}
</script>
