<template>
  <main v-if="account.sendgridToken">
    <section class="container mx-auto">
      <nuxt-link to="/" class="inline-block mb-2 text-inherit no-underline">&larr; Back to Dashboard</nuxt-link>
      <Card>
        <h2 class="mb-4">Sendgrid</h2>
        <p>More actions coming here soon!</p>
      </Card>
    </section>
  </main>
  <main v-else>
    <section class="container mx-auto">
      <nuxt-link to="/" class="inline-block mb-2 text-inherit no-underline">&larr; Back to Dashboard</nuxt-link>
      <Card>
        Please activate your Sendgrid integration <nuxt-link to="/integrations">here</nuxt-link>.
      </Card>
    </section>
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
    this.$store.commit('setPageTitle', 'Sendgrid')
  }
}
</script>
