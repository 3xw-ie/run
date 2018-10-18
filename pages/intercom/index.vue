<template>
  <main v-if="account.intercomToken">
    <section class="container mx-auto">
      <nuxt-link to="/" class="inline-block mb-2 text-inherit no-underline">&larr; Back to Dashboard</nuxt-link>
      <Card>
        <h2 class="mb-4">Intercom</h2>
        <p>More actions here coming soon!</p>
      </Card>
    </section>
  </main>
  <main v-else>
    <Card class="container mx-auto">
      Please activate your Intercom integration <nuxt-link to="/integrations">here</nuxt-link>.
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
    this.$store.commit('setPageTitle', 'Intercom')
  }
}
</script>
