<template>
  <p>Logging you out.</p>
</template>

<script>
export default {
  layout: 'empty',
  beforeCreate() {
    const unsetToken = require('~/utils/auth').unsetToken
    const logout = require('~/utils/lock').logout

    unsetToken()
    logout()
  }
}
</script>
