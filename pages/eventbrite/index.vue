<template>
  <main v-if="account.eventbriteToken">
    <section class="container mx-auto">
      <nuxt-link to="/" class="inline-block mb-2 text-inherit no-underline">&larr; Back to Dashboard</nuxt-link>
      <Card>
        <h2 class="mb-4">Eventbrite</h2>
        <h3 class="mb-4">Events</h3>
        <Table :data="events.events"/>
      </Card>
    </section>
  </main>
  <main v-else>
    <section class="container mx-auto">
      <nuxt-link to="/" class="inline-block mb-2 text-inherit no-underline">&larr; Back to Dashboard</nuxt-link>
      <Card>
        Please activate your Eventbrite integration <nuxt-link to="/integrations">here</nuxt-link>.
      </Card>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import Card from '~/components/Card'
import Table from '~/components/Table'
import eventbrite from '~/plugins/eventbrite'

export default {
  layout: 'dashboard',
  components: {
    Card,
    Table
  },
  mixins: [eventbrite],
  computed: mapGetters(['account']),
  beforeCreate() {
    this.$store.commit('setPageTitle', 'Eventbrite')
  },
  mounted() {
    this.getEventbriteUserEvents()
  }
}
</script>
