<template>
  <main v-if="account.stripeToken">
    <section class="container mx-auto">
      <nuxt-link to="/integrations" class="inline-block mb-2 text-inherit no-underline">&larr; Back to Integrations</nuxt-link>
      <card>
        <h2 class="mb-4">Stripe</h2>
        <h3 class="mb-4">
          <nuxt-link to="/stripe/charges" class="text-blue no-underline">Charges &rarr;</nuxt-link>
        </h3>
        <h3>
          <nuxt-link to="/stripe/customers" class="text-blue no-underline">Customers &rarr;</nuxt-link>
        </h3>
      </card>
    </section>
  </main>
  <main v-else>
    <card class="container mx-auto">
      Please activate your Stripe integration <nuxt-link to="/integrations">here</nuxt-link>.
    </card>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import card from '~/components/card'

export default {
  layout: 'dashboard',
  components: {
    card
  },
  computed: mapGetters(['account']),
  beforeCreate() {
    this.$store.commit('setPageTitle', 'Stripe')
  }
}
</script>
