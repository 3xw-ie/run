<template>
  <main v-if="account.intercomToken">
    <section class="container mx-auto">
      <nuxt-link to="/integrations" class="inline-block mb-2 text-inherit no-underline">&larr; Back to Integrations</nuxt-link>
      <card>
        <h2 class="mb-4">Intercom</h2>
        <p>More actions here coming soon!</p>
      </card>
    </section>
  </main>
  <main v-else>
    <card class="container mx-auto">
      Please activate your Intercom integration <nuxt-link to="/integrations">here</nuxt-link>.
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
    this.$store.commit('setPageTitle', 'Intercom')
  }
}
</script>
