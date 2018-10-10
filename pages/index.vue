<template>
  <main>
    <section class="grid">
      <!-- <card v-for="card in dashboard.cards" :key="card.title" :card="card"/> -->
    </section>
    <card class="mt-4">
      <pre>{{ test }}</pre>
    </card>
  </main>
</template>

<script>
import card from '~/components/card'
import { mapGetters } from 'vuex'
import account from '~/apollo/queries/account'

export default {
  layout: 'dashboard',
  components: {
    card
  },
  computed: {
    ...mapGetters(['dashboard', 'test'])
  }
}
</script>

<style scoped>
.grid {
  display: grid;
  grid-gap: 1em;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}
</style>
