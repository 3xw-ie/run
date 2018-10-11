<template>
  <main class="min-h-screen w-full flex flex-col">
    <header :style="'background-color:' + dashboard.primaryColor" class="flex bg-blue text-white p-4 shadow-md">
      <h2>
        <nuxt-link to="/" class="text-inherit no-underline">
          {{ dashboard.title ? dashboard.title : 'Dashboard' }}
        </nuxt-link>
        <span v-if="page.title !== dashboard.title">/ Settings</span>
      </h2>
      <navbar class="flex-1 flex justify-end items-center text-white"/>
    </header>
    <section class="flex-1 flex flex-col">
      <nuxt class="flex-1 p-4 bg-grey-lighter"/>
    </section>
  </main>
</template>

<script>
import navbar from '~/components/navbar'
import { mapGetters } from 'vuex'

export default {
  head: function() {
    return {
      title: this.metaTitle
    }
  },
  middleware: ['authenticated', 'account', 'authorized'],
  components: {
    navbar
  },
  computed: {
    ...mapGetters(['metaTitle', 'page', 'dashboard'])
  },
  created() {
    this.$store.commit('setPageTitle', this.dashboard.title)
  }
}
</script>

<style>
.__nuxt-error-page {
  @apply w-full;
}
</style>
