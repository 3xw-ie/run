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
      let hash = getQueryParams(this.$route.hash)
      hash.state = decodeURIComponent(hash.state)
      return hash
    }
  },
  async beforeMount() {
    console.log(this.hash)
    this.$apollo
      .mutate({
        mutation: setToken,
        variables: {
          domain: this.hash.state,
          data: {
            eventbriteToken: this.hash.access_token
          }
        }
      })
      .then(response => {
        this.$store.commit('setToken', 'eventbrite', this.hash.access_token)
        const scheme =
          this.hash.state === 'localhost:3000' ? 'http://' : 'https://'
        const url = scheme.concat(this.hash.state, '/integrations')
        window.location = url
      })
      .catch(error => console.error(error))
  }
}
</script>
