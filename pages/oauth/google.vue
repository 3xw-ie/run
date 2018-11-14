<template>
  <p>
    This should just take a second.
  </p>
</template>

<script>
import { getQueryParams } from '~/utils/auth'
import setToken from '~/apollo/mutations/setToken'

export default {
  middleware: 'oauth-google',
  layout: 'empty'
}
</script>
