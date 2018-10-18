<template>
  <main v-if="account.stripeToken">
    <section class="container mx-auto">
      <nuxt-link to="/" class="inline-block mb-2 text-inherit no-underline">&larr; Back to Dashboard</nuxt-link>
      <Card>
        <h2 class="mb-4">Stripe</h2>
        <h3 class="mb-4">
          <nuxt-link to="/stripe/charges" class="text-blue no-underline">Charges &rarr;</nuxt-link>
        </h3>
        <h3>
          <nuxt-link to="/stripe/customers" class="text-blue no-underline">Customers &rarr;</nuxt-link>
        </h3>
      </Card>
    </section>
  </main>
  <main v-else>
    <Card class="container mx-auto">
      Please activate your Stripe integration <nuxt-link to="/integrations">here</nuxt-link>.
    </Card>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import Card from '~/components/Card'

export default {
  layout: 'dashboard',
  components: {
    Card
  },
  computed: mapGetters(['account']),
  beforeCreate() {
    this.$store.commit('setPageTitle', 'Stripe')
  }
}
</script>
