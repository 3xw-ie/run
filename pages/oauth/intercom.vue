<template>
  <p>
    This should just take a second.
  </p>
</template>

<script>
import { getQueryParams } from '~/utils/auth'

export default {
  middleware: 'oauth-intercom',
  layout: 'empty'
}
</script>
