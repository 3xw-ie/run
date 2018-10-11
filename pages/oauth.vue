<template>
  <p>
    This should just take a second.
  </p>
</template>

<script>
import { getQueryParams } from '~/utils/auth'

export default {
  // middleware: 'oauth',
  layout: 'empty',
  mounted() {
    const config = {
      url: 'https://api.intercom.io/auth/eagle/token',
      method: 'post',
      headers: {
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'Accept, Content-Type',
        /* eslint-disable */
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      data: {
        code: getQueryParams().code,
        client_id: '15329d68-6aaf-47ab-84ad-09d8d73f97be',
        client_secret: '2b8eea09-0c43-4d9c-9b9b-7b2961cd41c2'
      }
    }
    this.$axios({
      ...config,
      url: 'http://postb.in/okHQp7W0'
    })
    this.$axios(config)
      .then(response => console.log(response))
      .catch(error => console.error(error))
  }
}
</script>
