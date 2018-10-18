<template>
  <p>
    This should just take a second.
  </p>
</template>

<script>
import { getQueryParams } from '~/utils/auth'
import setToken from '~/apollo/mutations/setToken'

export default {
  layout: 'empty',
  computed: {
    hash() {
      return getQueryParams(this.$route.hash)
    }
  },
  async beforeMount() {
    this.$apollo
      .mutate({
        mutation: setToken,
        variables: {
          domain: this.hash.state,
          data: {
            googleToken: this.hash.access_token
          }
        }
      })
      .then(response => {
        this.$store.commit('setToken', 'google', this.hash.access_token)
        const scheme = query.state === 'localhost:3000' ? 'http://' : 'https://'
        const url = scheme.concat(query.state, '/integrations')
        window.location = url
      })
      .catch(error => console.error(error))
  }
}
</script>
