<template>
  <p>Signing in...</p>
</template>

<script>
import { setToken, checkSecret, extractInfoFromHash } from '~/utils/auth'

export default {
  layout: 'empty',
  beforeMount() {
    const { token, secret } = extractInfoFromHash()
    if (!checkSecret(secret) || !token) {
      console.error('Something happened with the Sign In request')
    }
    setToken(token)
    window.location = '/'
  }
}
</script>
