<template>
  <main>
    <card class="max-w-md mx-auto">
      <h3 class="mb-4">Integrations</h3>
      <h4 class="my-2">Intercom</h4>
      <div class="sm:flex sm:justify-between sm:items-center">
        <p class="flex-1 mb-2 sm:mb-0">Intercom is the world’s first customer platform helping internet businesses accelerate growth.</p>
        <div class="w-40 flex justify-end">
          <button v-if="account.intercomToken" type="submit" class="px-3 py-2 rounded ml-4 bg-red-dark text-white" @click.prevent="removeIntegration('intercom')">
            Remove
          </button>
          <a v-else :href="`https://app.intercom.io/oauth?client_id=15329d68-6aaf-47ab-84ad-09d8d73f97be&state=${account.domain}`">
            <img src="https://static.intercomassets.com/assets/oauth/primary-7edb2ebce84c088063f4b86049747c3a.png" srcset="https://static.intercomassets.com/assets/oauth/primary-7edb2ebce84c088063f4b86049747c3a.png 1x, https://static.intercomassets.com/assets/oauth/primary@2x-0d69ca2141dfdfa0535634610be80994.png 2x, https://static.intercomassets.com/assets/oauth/primary@3x-788ed3c44d63a6aec3927285e920f542.png 3x">
          </a>
        </div>
      </div>
      <hr class="my-4 -mx-4 border">
      <h4 class="my-2">Stripe</h4>
      <div class="sm:flex sm:justify-between sm:items-center">
        <p class="sm:flex-1  mb-2 sm:mb-0">Stripe is the best way to accept payments online. Stripe aims to expand internet commerce by making it easy to process transactions and manage an online business.</p>
        <div class="w-40 flex justify-end">
          <button v-if="account.stripeToken" type="submit" class="px-3 py-2 rounded ml-4 bg-red-dark text-white" @click.prevent="removeIntegration('stripe')">
            Remove
          </button>
          <a v-else :href="`https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_BgrkpPIf88dSDrpE7D4DVBkn91zFipuB&scope=read_only&state=${account.domain}`">
            <img src="/img/stripe-connect-button.png" srcset="/img/stripe-connect-button.png 1x, /img/stripe-connect-button@2x.png 2x, /img/stripe-connect-button@3x.png 3x" alt="Connect with Stripe" class="h-full w-full">
          </a>
        </div>
      </div>
    </card>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import unsetToken from '~/apollo/mutations/unsetToken'
import card from '~/components/card'

export default {
  layout: 'dashboard',
  components: {
    card
  },
  computed: mapGetters(['account']),
  beforeCreate() {
    this.$store.commit('setPageTitle', 'Settings')
  },
  methods: {
    removeIntegration(provider) {
      this.$store.commit('unsetToken', provider)
      this.$apollo
        .mutate({
          mutation: unsetToken,
          variables: {
            domain: this.account.domain,
            data: {
              [`${provider}Token`]: null
            }
          }
        })
        .then(response => console.log(response))
        .catch(error => console.error(error))
    }
  }
}
</script>
