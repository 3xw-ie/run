<template>
  <main v-if="account.googleToken">
    <section class="container mx-auto">
      <nuxt-link to="/" class="inline-block mb-2 text-inherit no-underline">&larr; Back to Dashboard</nuxt-link>
      <Card>
        <h2 class="mb-4">Google</h2>
        <p>More actions coming here soon!</p>
      </Card>
    </section>
  </main>
  <main v-else>
    <Card class="container mx-auto">
      Please activate your Google integration <nuxt-link to="/integrations">here</nuxt-link>.
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
    this.$store.commit('setPageTitle', 'Google')
  }
}
</script>
