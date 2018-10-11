<template>
  <main>
    <section class="grid">
      <card v-for="card in dashboard.cards" :key="card.title" :card="card"/>
    </section>
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
    ...mapGetters(['account', 'dashboard'])
  },
  created() {
    this.$store.commit('setPageTitle', this.dashboard.title)
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
