<template>
  <div id="auth0-lock"/>
</template>

<script>
export default {
  middleware: 'anonymous',
  layout: 'empty',
  mounted() {
    const showLogin = require('~/utils/lock').showLogin
    showLogin('auth0-lock')
  }
}
</script>
