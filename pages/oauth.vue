<template>
  <p>
    This should just take a second.
  </p>
</template>

<script>
import { getQueryParams } from '~/utils/auth'

export default {
  middleware: 'oauth',
  layout: 'empty',
  mounted() {
    this.$axios({
      url: 'https://api.intercom.io/auth/eagle/token',
      method: 'post',
      data: {
        code: getQueryParams().code,
        client_id: '15329d68-6aaf-47ab-84ad-09d8d73f97be',
        clianet_secret: '2b8eea09-0c43-4d9c-9b9b-7b2961cd41c2'
      }
    })
      .then(response => {
        this.$axios({
          url: 'http://postb.in/VGNb31jp',
          method: 'post',
          data: response
        })
      })
      .catch(error => console.error(error))
  }
}
</script>
