<template>
  <main>
    <card class="max-w-md mx-auto">
      <h3>Integrations</h3>
      <h4 class="mt-2">Intercom</h4>
      <div class="flex justify-between items-center">
        <p>Intercom is the world’s first customer platform helping internet businesses accelerate growth.</p>
        <button v-if="account.intercomToken" type="submit" class="px-3 py-2 rounded ml-4 bg-red-dark text-white" @click.prevent="removeIntercomIntegration()">
          Remove
        </button>
        <a v-else :href="`https://app.intercom.io/oauth?client_id=15329d68-6aaf-47ab-84ad-09d8d73f97be&redirect_uri=${url}&state=${account.domain}`">
          <img src="https://static.intercomassets.com/assets/oauth/primary-7edb2ebce84c088063f4b86049747c3a.png" srcset="https://static.intercomassets.com/assets/oauth/primary-7edb2ebce84c088063f4b86049747c3a.png 1x, https://static.intercomassets.com/assets/oauth/primary@2x-0d69ca2141dfdfa0535634610be80994.png 2x, https://static.intercomassets.com/assets/oauth/primary@3x-788ed3c44d63a6aec3927285e920f542.png 3x">
        </a>
      </div>
    </card>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import unsetIntercomToken from '~/apollo/mutations/unsetIntercomToken'
import card from '~/components/card'

export default {
  layout: 'dashboard',
  components: {
    card
  },
  computed: {
    url() {
      const scheme =
        this.account.domain === 'localhost:3000' ? 'http://' : 'https://'
      return scheme.concat(this.account.domain, '/oauth/intercom')
    },
    ...mapGetters(['account'])
  },
  beforeCreate() {
    this.$store.commit('setPageTitle', 'Settings')
  },
  methods: {
    removeIntercomIntegration() {
      this.$apollo
        .mutate({
          mutation: unsetIntercomToken,
          variables: {
            domain: this.account.domain
          }
        })
        .then(response => this.$store.commit('unsetIntercomToken'))
        .catch(error => console.error(error))
    }
  }
}
</script>
