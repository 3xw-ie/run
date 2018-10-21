<template>
  <main>
    <section class="container mx-auto grid">
      <Block v-for="block in dashboard.cards" :key="block.title" :block="block"/>
    </section>
  </main>
</template>

<script>
import Block from '~/components/Block'
import { mapGetters } from 'vuex'
import account from '~/apollo/queries/account'

export default {
  layout: 'dashboard',
  components: {
    Block
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

@media screen and (min-width: 576px) {
  .columns-2 {
    grid-column-start: span 2;
  }
  .columns-3 {
    grid-column-start: span 3;
  }
  .rows-2 {
    grid-row-start: span 2;
  }
  .rows-3 {
    grid-row-start: span 3;
  }
}
</style>
